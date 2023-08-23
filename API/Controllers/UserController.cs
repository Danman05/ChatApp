using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{

    private readonly YeeterDbContext _dbContext;

    public UserController(YeeterDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet("GetAll")]
    public async Task<ActionResult<List<User>>> GetAll()
    {
        return Ok(await _dbContext.Users.ToListAsync());
    }

    [HttpGet("GetOne")]
    public async Task<ActionResult<List<User>>> GetOne(int id)
    {
        return Ok(await _dbContext.Users.FindAsync(id));
    }
    [HttpPost("Register")]
    public async Task<ActionResult<List<User>>> Register(User user)
    {

        if (await _dbContext.Users.AnyAsync(u => u.Username == user.Username))
        {
            return Conflict("Username already exists");
        }
        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync();

        return CreatedAtAction("GetOne", new { id = user.UserId }, user);
    }
    [HttpDelete("Delete")]
    public async Task<ActionResult<List<User>>> Delete(int id)
    {
        User? foundUser = await _dbContext.Users.FindAsync(id);

        if (foundUser == null)
        {
            return NotFound();
        }

        // Remove user references from UserFollowers
        List<UserFollower> userFollowers = await _dbContext.UserFollowers
            .Where(uf => uf.ThisUserId == id || uf.FollowsUserId == id)
            .ToListAsync();
            
        if (userFollowers.Count > 0) {
            _dbContext.UserFollowers.RemoveRange(userFollowers);

            await _dbContext.SaveChangesAsync();
        }

        _dbContext.Users.Remove(foundUser);

        await _dbContext.SaveChangesAsync();

        return Ok($"Delete user ID: {foundUser.UserId} Username: {foundUser.Username}");
    }

    [HttpGet("GetProcData")]
    public async Task<ActionResult<List<FollowerResult>>> GetProc(int id)
    {
        string storedProcedure = $@"exec GetProfileInfo @userIDParam = {id}";

        return Ok(await _dbContext.FollowerResults.FromSqlRaw(storedProcedure).ToListAsync());
    }

    [HttpPost("Follow")]
    public async Task<ActionResult<List<UserFollower>>> Follow(int currentUserID, int followedUserID)
    {
        // Get the User entities by their IDs
        User? thisUser = await _dbContext.Users.FindAsync(currentUserID);
        User? followsUser = await _dbContext.Users.FindAsync(followedUserID);

        if (thisUser == null || followsUser == null)
        {
            // Handle error when users are not found
            return NotFound();
        }

        UserFollower follower = new UserFollower()
        {
            ThisUserId = currentUserID,
            FollowsUserId = followedUserID,
            ThisUser = thisUser,
            FollowsUser = followsUser
        };

        _dbContext.UserFollowers.Add(follower);

        await _dbContext.SaveChangesAsync();

        return Ok($"User: {currentUserID} Followed {followedUserID} succesfully");
    }

}
