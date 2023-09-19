using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{

    private readonly YeeterDbContext _dbContext;
    private readonly HashingService _hashingService;

    public AuthController(YeeterDbContext dbContext, HashingService hashingService)
    {
        _dbContext = dbContext;
        _hashingService = hashingService;
    }
    [HttpGet("Login")]
    public async Task<ActionResult<List<ProfileResult>>> LogInUser(string username, string password)
    {
        string hash = _hashingService.Hash256(password);
        return Ok(await _dbContext.ProfileResults.FromSqlInterpolated($@"exec LogInUser @username = {username}, @password = {hash}").ToListAsync());
    }
}

