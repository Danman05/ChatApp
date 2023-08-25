using System;
using System.Collections.Generic;

namespace API.Models;

public partial class ProfileResult
{
    public int userID { get; set; }
    public string? username { get; set; }

    public string? displayName { get; set; }

    public string? ProfilePicturePath { get; set; }
    public bool IsPrivate { get; set; }
    public bool IsVerified { get; set; }
    public DateTime AccountCreationDate { get; set; }
    
    public int FollowingCount { get; set; }
    public int FollowerCount { get; set; }
}
