using System.Diagnostics;
using API.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]

public class PostController : ControllerBase
{

    private readonly YeeterDbContext _dbContext;

    public PostController(YeeterDbContext dbContext)
    {
        _dbContext = dbContext;

    }

    [HttpGet("GetAll")]
    public async Task<ActionResult<List<PostedContent>>> GetAllPosts() 
    {   
return Ok(await _dbContext.PostedContents.Include(p => p.PosterUser).ToListAsync());
    }

    [HttpPost("Create")]
    public async Task<ActionResult<List<PostedContent>>> CreatePost(PostedContent post) 
    {   
        User user = await _dbContext.Users.FindAsync(post.PosterUserId);

        PostedContent p = new PostedContent () {
          Title = post.Title,
          Content = post.Content,
          PosterUserId = user.UserId,
          PosterUser = user
        };  
        await _dbContext.PostedContents.AddAsync(p);
        await _dbContext.SaveChangesAsync();
        return Ok(await _dbContext.PostedContents.ToListAsync());
    }
}
