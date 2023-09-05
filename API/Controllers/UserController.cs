using System.Diagnostics;
using API.Models;
using Microsoft.AspNetCore.Authorization;
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
    public async Task<ActionResult<List<ProfileResult>>> GetAll()
    {
        return Ok(await _dbContext.ProfileResults.FromSqlInterpolated($@"exec GetAllSafeInfo").ToListAsync());
    }

    [HttpGet("GetOne")]
    public async Task<ActionResult<List<ProfileResult>>> GetOne(int id)
    {
        return Ok(await _dbContext.ProfileResults.FindAsync(id));
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
            .Where(uf => uf.ThisUserId == foundUser.UserId || uf.FollowsUserId == foundUser.UserId)
            .ToListAsync();
        
        List<PostedContent> postedContents = await _dbContext.PostedContents
        .Where(pc => pc.PosterUserId == foundUser.UserId).ToListAsync();

        if (userFollowers.Count > 0) {
            _dbContext.UserFollowers.RemoveRange(userFollowers);

            await _dbContext.SaveChangesAsync();
        }

        if(postedContents.Count > 0) {
            _dbContext.PostedContents.RemoveRange(postedContents);

            await _dbContext.SaveChangesAsync();
        }

        _dbContext.Users.Remove(foundUser);

        await _dbContext.SaveChangesAsync();

        return Ok($"Delete user ID: {foundUser.UserId} Username: {foundUser.Username}");
    }

    [HttpGet("GetProcData")]
    public async Task<ActionResult<List<FollowerResult>>> GetProc(int id)
    {
        return Ok(await _dbContext.FollowerResults.FromSqlInterpolated($@"exec GetProfileInfo @userIDParam = {id}").ToListAsync());
    }
    [HttpGet("ProfileData")]
    public async Task<ActionResult<List<ProfileResult>>> ProfileProc(int id) 
    {        
        return Ok(await _dbContext.ProfileResults.FromSqlInterpolated($@"exec GetProfileData @userIDParam = {id}").ToListAsync());
    }

    [HttpPut("EditProfile")]
    public async Task<ActionResult<List<ProfileResult>>> EditProfile(ProfileResult profile)
    {
        User? uprofile = await _dbContext.Users.FindAsync(profile.UserId);


        if (uprofile == null)
            return BadRequest("User not found"); // Changed the error message

        if (profile.DisplayName == null)
            return BadRequest("ProfileResult not found");

        // Update user profile properties
        uprofile.DisplayName = profile.DisplayName;
        uprofile.ProfilePicturePath = profile.ProfilePicturePath;
        uprofile.IsPrivate = profile.IsPrivate;
        try
        {
            await _dbContext.SaveChangesAsync();
            return Ok("Profile updated successfully");
        }
        catch (Exception ex)
        {
            // Handle any exceptions that occur during saving changes
            return BadRequest($"An error occurred: {ex.Message}");
        }
    }


}
