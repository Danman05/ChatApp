using System.Diagnostics;
using System.Reflection.Metadata.Ecma335;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly YeeterDbContext _dbContext;
    private readonly HashingService _hashingService;
    public UserController(YeeterDbContext dbContext, HashingService hashingService)
    {
        _dbContext = dbContext;
        _hashingService = hashingService;
    }

    /// <summary>
    /// Executes stored procedure GetAllSafeInfo
    /// </summary>
    /// <returns>Returns SQL query result</returns>
    [HttpGet("GetAll")]
    public async Task<ActionResult<List<ProfileResult>>> GetAll()
    {
        try
        {
            return Ok(await _dbContext.ProfileResults.FromSqlInterpolated($@"exec GetAllSafeInfo").ToListAsync());
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = $"An error occurred: {ex.Message}" });
        }
    }

    /// <summary>
    /// Executes stored procedure GetProfileInfo
    /// </summary>
    /// <param name="id"></param>
    /// <returns>Returns SQL query result</returns>
    [HttpGet("GetProcData")]
    public async Task<ActionResult<List<FollowerResult>>> GetProc(int id)
    {
        try
        {
            return Ok(await _dbContext.FollowerResults.FromSqlInterpolated($@"exec GetProfileInfo @userIDParam = {id}").ToListAsync());
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = $"An error occurred: {ex.Message}" });
        }
    }

    /// <summary>
    /// Executes stored procedure GetProfileData
    /// </summary>
    /// <param name="id"></param>
    /// <returns>Returns SQL query result</returns>
    [HttpGet("ProfileData")]
    public async Task<ActionResult<List<ProfileResult>>> ProfileProc(int id)
    {
        try
        {
            return Ok(await _dbContext.ProfileResults.FromSqlInterpolated($@"exec GetProfileData @userIDParam = {id}").ToListAsync());
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = $"An error occurred: {ex.Message}" });
        }
    }

    /// <summary>
    /// Gets a user including password
    /// </summary>
    /// <param name="id"></param>
    /// <returns>Returns a User object</returns>
    [HttpGet("GetOne")]
    public async Task<ActionResult<List<User>>> GetOne(int id)
    {
        try
        {
            return Ok(await _dbContext.Users.FindAsync(id));
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = $"An error occurred: {ex.Message}" });
        }
    }

    /// <summary>
    /// Creates/Registers a new user
    /// </summary>
    /// <param name="user"></param>
    /// <returns>Returns message</returns>
    [HttpPost("Register")]
    public async Task<ActionResult<List<string>>> Register(User user)
    {
        try
        {
            if (await _dbContext.Users.AnyAsync(u => u.Username == user.Username))
            {
                return Conflict("Username already exists");
            }
            if(user.Password.Length < 7 )
                return Conflict("Password not long enough");

            user.Password = _hashingService.Hash256(user.Password);
            
            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();

            return Ok(new { message = "User Created successfully" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = $"An error occurred: {ex.Message}" });
        }
    }

    /// <summary>
    /// Edit user profile
    /// </summary>
    /// <param name="profile"></param>
    /// <returns>Returns message</returns>
    [HttpPut("EditProfile")]
    public async Task<ActionResult<List<string>>> EditProfile(ProfileResult profile)
    {
        try
        {
            User? uprofile = await _dbContext.Users.FindAsync(profile.UserId);

            if (uprofile == null)
                return BadRequest(new { message = "User not found" });

            if (profile.DisplayName == null)
                return BadRequest(new { message = "Profile property not found" });

            // Update user profile properties
            uprofile.DisplayName = profile.DisplayName;
            uprofile.ProfilePicturePath = profile.ProfilePicturePath;
            uprofile.IsPrivate = profile.IsPrivate;
            await _dbContext.SaveChangesAsync();
            return Ok(new { message = "Profile updated successfully" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = $"An error occurred: {ex.Message}" });
        }
    }

    /// <summary>
    /// Delete a user
    /// </summary>
    /// <param name="id"></param>
    /// <returns>Returns message</returns>
    [HttpDelete("Delete")]
    public async Task<ActionResult<List<string>>> Delete(int id)
    {
        try
        {
            User? foundUser = await _dbContext.Users.FindAsync(id);

            if (foundUser == null)
            {
                return NotFound();
            }

            // Finds and stores user references from UserFollowers & PostedContents
            List<UserFollower> userFollowers = await _dbContext.UserFollowers
                .Where(uf => uf.ThisUserId == foundUser.UserId || uf.FollowsUserId == foundUser.UserId)
                .ToListAsync();

            List<PostedContent> postedContents = await _dbContext.PostedContents
            .Where(pc => pc.PosterUserId == foundUser.UserId).ToListAsync();

            // Removes the references
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

            return Ok(new { message = $"Deleted user ID: {foundUser.UserId} Username: {foundUser.Username}" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = $"An error occurred: {ex.Message}" });
        }
    }
}
