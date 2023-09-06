using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{

    private readonly YeeterDbContext _dbContext;

    public AuthController(YeeterDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    /// <summary>
    /// Get Request - Executes stored procedure LogInUser
    /// </summary>
    /// <param name="username"></param>
    /// <param name="password"></param>
    /// <returns>Returns user details from the logged in user, excluding password</returns>
    [HttpGet("Login")]
    public async Task<ActionResult<List<ProfileResult>>> LogInUser(string username, string password)
    {
        return Ok(await _dbContext.ProfileResults.FromSqlInterpolated($@"exec LogInUser @username = {username}, @password = {password}").ToListAsync());
    }
}

