namespace API.Models;

public class FollowService
{
    private readonly YeeterDbContext _dbContext;

    public FollowService(YeeterDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public bool IsFollowing(int followerUserId, int followedUserId)
    {
        return _dbContext.UserFollowers
            .Any(f => f.ThisUserId == followerUserId && f.FollowsUserId == followedUserId);
    }
}