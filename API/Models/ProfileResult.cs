using System;
using System.Collections.Generic;

namespace API.Models;

public partial class ProfileResult
{
    public int UserId { get; set; }
    public string? Username { get; set; }

    public string? DisplayName { get; set; }

    public string? ProfilePicturePath { get; set; }
    public bool IsPrivate { get; set; }
    public bool IsVerified { get; set; }
    public DateTime AccountCreationDate { get; set; }
    
    public int FollowingCount { get; set; }
    public int FollowerCount { get; set; }
}
