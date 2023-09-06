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

    /// <summary>
    /// Post request - Creates/Registers a new user in the database.
    /// The database has unique usernames
    /// </summary>
    /// <param name="user"></param>
    /// <returns>Ok message</returns>
    [HttpPost("Register")]
    public async Task<ActionResult<List<string>>> Register(User user)
    {
        try
        {

            if (await _dbContext.Users.AnyAsync(u => u.Username == user.Username))
                return Conflict("Username already exists");

            if (user.Username.Length < 1)
                return Conflict("Username must be greater than one character");
            if (user.Password.Length < 7)
                return Conflict("Password must be greater than six characters");

            _dbContext.Users.Add(user);

            await _dbContext.SaveChangesAsync();

            return Ok(new { message = "User created successfully"});
        }
        catch (Exception ex)
        {
            return BadRequest($"An error occurred: {ex.Message}");
        }
    }

    /// <summary>
    /// Get Request - Executes stored procedure GetAllSafeInfo
    /// </summary>
    /// <returns>Returns all users information, excluding password</returns>
    [HttpGet("GetAll")]
    public async Task<ActionResult<List<ProfileResult>>> GetAll()
    {
        return Ok(await _dbContext.ProfileResults.FromSqlInterpolated($@"exec GetAllSafeInfo").ToListAsync());
    }

    /// <summary>
    /// Get Request - Executes stored procedure GetProfileInfo, takes a user id as parameter
    /// </summary>
    /// <param name="id"></param>
    /// <returns>Returns users which is followed by the passed user id</returns>
    [HttpGet("GetProcData")]
    public async Task<ActionResult<List<FollowerResult>>> GetProc(int id)
    {
        return Ok(await _dbContext.FollowerResults.FromSqlInterpolated($@"exec GetProfileInfo @userIDParam = {id}").ToListAsync());
    }

    /// <summary>
    /// Get Request - Executes stores procedure GetProfileData, takes a user id as parameter
    /// </summary>
    /// <param name="id"></param>
    /// <returns>Returns data from the given user</returns>
    [HttpGet("ProfileData")]
    public async Task<ActionResult<List<ProfileResult>>> ProfileProc(int id)
    {
        // Executes stored procedure GetProfileData,
        return Ok(await _dbContext.ProfileResults.FromSqlInterpolated($@"exec GetProfileData @userIDParam = {id}").ToListAsync());
    }

    /// <summary>
    /// Put Request - Updates users information
    /// </summary>
    /// <param name="profile"></param>
    /// <returns>ok message</returns>
    [HttpPut("EditProfile")]
    public async Task<ActionResult<List<string>>> EditProfile(ProfileResult profile)
    {
        try
        {
            User? uprofile = await _dbContext.Users.FindAsync(profile.UserId);

            // Null checks
            if (uprofile == null)
                return NotFound();

            if (profile.DisplayName == null)
                return NotFound();

            // Update user profile properties
            uprofile.DisplayName = profile.DisplayName;
            uprofile.ProfilePicturePath = profile.ProfilePicturePath;
            uprofile.IsPrivate = profile.IsPrivate;

            await _dbContext.SaveChangesAsync();

            return Ok(new { message = "Profile updated successfully"});

        }
        catch (Exception ex)
        {
            return BadRequest(new { message = $"An error occurred: {ex.Message}"});
        }
    }

    /// <summary>
    /// Delete Request - Deletes user and all relations from the user
    /// </summary>
    /// <param name="id"></param>
    /// <returns>Ok message</returns>
    [HttpDelete("Delete")]
    public async Task<ActionResult<List<string>>> Delete(int id)
    {
        try
        {
            User? foundUser = await _dbContext.Users.FindAsync(id);

            // Null check
            if (foundUser == null)
                return NotFound();

            // Finds and stores user references from 
            // UserFollowers & PostedContents
            List<UserFollower> userFollowers = await _dbContext.UserFollowers
                .Where(uf => uf.ThisUserId == foundUser.UserId || uf.FollowsUserId == foundUser.UserId)
                .ToListAsync();

            List<PostedContent> postedContents = await _dbContext.PostedContents
            .Where(pc => pc.PosterUserId == foundUser.UserId)
            .ToListAsync();

            if (userFollowers.Count > 0)
            {
                _dbContext.UserFollowers.RemoveRange(userFollowers);

                await _dbContext.SaveChangesAsync();
            }

            if (postedContents.Count > 0)
            {
                _dbContext.PostedContents.RemoveRange(postedContents);

                await _dbContext.SaveChangesAsync();
            }

            _dbContext.Users.Remove(foundUser);

            await _dbContext.SaveChangesAsync();

            return Ok(new { message = $"Deleted user ID: {foundUser.UserId} Username: {foundUser.Username}"});
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = $"An error occurred: {ex.Message}"});
        }
    }
}
