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

    /// <summary>
    /// Get Request - Gets all posts from users
    /// </summary>
    /// <returns>Returns all user posts</returns>
    [HttpGet("GetAll")]
    public async Task<ActionResult<List<PostedContent>>> GetAllPosts()
    {
        try
        {
            return Ok(await _dbContext.PostedContents
            .Include(p => p.PosterUser)
            .ToListAsync());
        }
        catch (Exception ex)
        {
            return BadRequest($"An error occurred: {ex.Message}");
        }
    }

    /// <summary>
    /// Get Request - Gets all posts from users where their private status is false
    /// </summary>
    /// <returns>Returns non private user posts</returns>
    [HttpGet("GetAllPublic")]
    public async Task<ActionResult<List<PostedContent>>> GetAllPublicPosts()
    {
        try
        {
            return Ok(await _dbContext.PostedContents
            .Include(p => p.PosterUser)
            .Where(p => !p.PosterUser.IsPrivate)
            .ToListAsync());
        }
        catch (Exception ex)
        {
            return BadRequest($"An error occurred: {ex.Message}");
        }
    }

    /// <summary>
    /// Post Request - Creates a post
    /// </summary>
    /// <param name="post"></param>
    /// <returns>Ok message</returns>
    [HttpPost("Create")]
    public async Task<ActionResult<List<string>>> CreatePost(PostedContent post)
    {
        try
        {
            User? user = await _dbContext.Users.FindAsync(post.PosterUserId);

            if (user == null)
                return BadRequest("User not found"); // Changed the error message

            PostedContent p = new PostedContent()
            {
                Title = post.Title,
                Content = post.Content,
                PosterUserId = user.UserId,
                PosterUser = user
            };
            await _dbContext.PostedContents.AddAsync(p);
            await _dbContext.SaveChangesAsync();
            return Ok(new { message = "Post created succesfully"});
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = $"An error occurred: {ex.Message}"});
        }
    }
}
