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
    /// Gets all posts
    /// </summary>
    /// <returns>Returns all posts</returns>
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
            return BadRequest(new { message = $"An error occurred: {ex.Message}" });
        }
    }

    /// <summary>
    /// Gets all public posts
    /// </summary>
    /// <returns>Returns public posts</returns>
    [HttpGet("GetAllPublic")]
    public async Task<ActionResult<List<PostedContent>>> GetAllPublicPosts()
    {
        try
        {
            return Ok(await _dbContext.PostedContents
            .Include(p => p.PosterUser)
            .Where(p => !p.PosterUser.IsPrivate )
            .ToListAsync());
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = $"An error occurred: {ex.Message}" });
        }
    }

    /// <summary>
    /// Create a new post
    /// </summary>
    /// <param name="post"></param>
    /// <returns>Returns message</returns>
    [HttpPost("Create")]
    public async Task<ActionResult<List<string>>> CreatePost(PostedContent post)
    {
        try
        {
            User? user = await _dbContext.Users.FindAsync(post.PosterUserId);

            if (user == null)
                return BadRequest(new {message = "Posting user not found"});

            PostedContent p = new PostedContent()
            {
                Title = post.Title,
                Content = post.Content,
                PosterUserId = user.UserId,
                PosterUser = user
            };
            await _dbContext.PostedContents.AddAsync(p);
            await _dbContext.SaveChangesAsync();

            return Ok(new { message = "Profile updated successfully" });
        }
        catch (Exception ex)
        {
            return BadRequest($"An error occurred: {ex.Message}");
        }
    }

    /// <summary>
    /// Edit user profile
    /// </summary>
    /// <param name="profile"></param>
    /// <returns>Returns message</returns>
    [HttpPut("EditPost")]
    public async Task<ActionResult<List<string>>> EditPost(PostedContent userPost)
    {
        try
        {
            PostedContent? post = await _dbContext.PostedContents.FindAsync(userPost.PostId);

            if (post == null)
                return BadRequest(new { message = "User not found" });

            // Update post properties
            post.Title = userPost.Title;
            post.Content = userPost.Content;
            await _dbContext.SaveChangesAsync();
            return Ok(new { message = "Post updated successfully" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = $"An error occurred: {ex.Message}" });
        }
    }

    /// <summary>
    /// Delete a post
    /// </summary>
    /// <param name="id"></param>
    /// <returns>Returns message</returns>
    [HttpDelete("Delete")]
    public async Task<ActionResult<List<string>>> Delete(int id)
    {
        try
        {
            PostedContent? foundPost = await _dbContext.PostedContents.FindAsync(id);

            if (foundPost == null)
            {
                return NotFound();
            }

            _dbContext.PostedContents.Remove(foundPost);

            await _dbContext.SaveChangesAsync();

            return Ok(new { message = $"Deleted post ID: {foundPost.PostId} Title: {foundPost.Title}" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = $"An error occurred: {ex.Message}" });
        }
    }
}
