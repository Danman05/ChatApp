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
    public async Task<ActionResult<List<User>>> GetUser(int id)
    {
        return Ok(await _dbContext.Users.FindAsync(id));
    }
    [HttpPost("RegisterUser")]
    public async Task<ActionResult<List<User>>>RegisterUser(User user) {

        if (await _dbContext.Users.AnyAsync(u => u.Username == user.Username))
        {
            return Conflict("Username already exists");
        }
        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync();

        return CreatedAtAction("GetOne", new { id = user.UserId }, user);
    }


    [HttpGet("GetProcData")]
    public async Task<ActionResult<List<FollowerResult>>> GetProc(int id)
    {
        string storedProcedure = $@"exec GetProfileInfo @userIDParam = {id}";
        return Ok(await _dbContext.FollowerResults.FromSqlRaw(storedProcedure).ToListAsync());
    }

    [HttpPost("Follow")]
    public async Task<ActionResult<List<UserFollower>>> Follow(int currentUserID, int followsUserID )
    {
        // Assuming you have a way to get the User entities by their IDs
        var thisUser = await _dbContext.Users.FindAsync(currentUserID);
        var followsUser = await _dbContext.Users.FindAsync(followsUserID);

        if (thisUser == null || followsUser == null)
        {
            // Handle error when users are not found
            return NotFound();
        }
        UserFollower follower = new UserFollower() {
            ThisUserId = currentUserID,
            FollowsUserId = followsUserID,
            ThisUser = thisUser,
            FollowsUser = followsUser
        };
        // follower.ThisUser = thisUser;
        // follower.FollowsUser = followsUser;

        _dbContext.UserFollowers.Add(follower);
        await _dbContext.SaveChangesAsync();
        return Ok(await _dbContext.UserFollowers.ToListAsync());
    }

}
