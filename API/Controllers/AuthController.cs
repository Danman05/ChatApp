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
    [HttpGet("Login")]
    public async Task<ActionResult<List<ProfileResult>>> LogInUser(string username, string password)
    {
        return Ok(await _dbContext.ProfileResults.FromSqlInterpolated($@"exec LogInUser @username = {username}, @password = {password}").ToListAsync());
    }
}

