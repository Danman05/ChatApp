using System.Diagnostics;
using API.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]

public class FollowController : ControllerBase
{

    private readonly YeeterDbContext _dbContext;
    private readonly FollowService _followService;

    public FollowController(YeeterDbContext dbContext, FollowService followService)
    {
        _dbContext = dbContext;
        _followService = followService;
    }

    /// <summary>
    /// Get Request - Checks if user is following other user
    /// </summary>
    /// <param name="followerUserId"></param>
    /// <param name="followedUserId"></param>
    /// <returns>Returns bool</returns>
    [HttpGet("CheckFollow")]
    public IActionResult CheckFollower(int followerUserId, int followedUserId)
    {
        bool isFollowing = _followService.IsFollowing(followerUserId, followedUserId);
        return new OkObjectResult(isFollowing);
    }

    /// <summary>
    /// Post Request - Adds or removes follower relationship, 
    /// depending on the following status
    /// </summary>
    /// <param name="follow"></param>
    /// <returns>Returns bool</returns>
    [HttpPost("Follow")]
    public async Task<ActionResult<bool>> Follow(FollowId follow)
    {
        try
        {
            // Get the User entities by their IDs
            User? thisUser = await _dbContext.Users.FindAsync(follow.ThisUserId);
            User? followsUser = await _dbContext.Users.FindAsync(follow.FollowsUserId);

            // Null check
            if (thisUser == null || followsUser == null)
                return NotFound();


            if (_followService.IsFollowing(follow.ThisUserId, follow.FollowsUserId))
            {
                // User is already following, so unfollow
                UserFollower? userToRemove = _dbContext.UserFollowers.FirstOrDefault(x => x.ThisUserId == follow.ThisUserId && x.FollowsUserId == follow.FollowsUserId);
                if (userToRemove != null)
                    _dbContext.UserFollowers.Remove(userToRemove);
            }
            else
            {
                // User is not following, so follow
                UserFollower follower = new UserFollower()
                {
                    ThisUserId = follow.ThisUserId,
                    FollowsUserId = follow.FollowsUserId,
                    ThisUser = thisUser,
                    FollowsUser = followsUser
                };

                _dbContext.UserFollowers.Add(follower);
            }

            await _dbContext.SaveChangesAsync();

            return Ok(true);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = $"An error occurred: {ex.Message}"});
        }
    }
}
