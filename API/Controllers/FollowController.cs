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

    [HttpGet("CheckFollow")]
    public IActionResult CheckFollower(int followerUserId, int followedUserId) 
    {
        bool isFollowing = _followService.IsFollowing(followerUserId, followedUserId);
        return new OkObjectResult(isFollowing);
    }
    [HttpPost("Follow")]
    public async Task<ActionResult<bool>> Follow(FollowId follow)
    {
        Debug.WriteLine(follow);
        System.Console.WriteLine(follow);
        // Get the User entities by their IDs
        User? thisUser = await _dbContext.Users.FindAsync(follow.ThisUserId);
        User? followsUser = await _dbContext.Users.FindAsync(follow.FollowsUserId);
        if (thisUser == null || followsUser == null)
        {
            // Handle error when users are not found
            return NotFound();
        }
        
        UserFollower follower = new UserFollower()
        {
            ThisUserId = follow.ThisUserId,
            FollowsUserId = follow.FollowsUserId,
            ThisUser = thisUser,
            FollowsUser = followsUser
        };
        if (_followService.IsFollowing(follow.ThisUserId, follow.FollowsUserId))
        {
            var userToRemove = _dbContext.UserFollowers.FirstOrDefault(x => x.ThisUserId == follow.ThisUserId && x.FollowsUserId == follow.FollowsUserId);
            if (userToRemove != null)
                _dbContext.UserFollowers.Remove(userToRemove);
        }
        else {
        _dbContext.UserFollowers.Add(follower);
        }

        await _dbContext.SaveChangesAsync();

        return Ok(true);
    }
}
