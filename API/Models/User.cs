using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace API.Models;

public partial class User
{
    public int UserId { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string DisplayName { get; set; } = null!;

    public string? ProfilePicturePath { get; set; }

    public bool IsPrivate { get; set; }

    public bool IsVerified { get; set; }

    public DateTime? AccountCreationDate { get; set; }

    [JsonIgnore]
    public virtual ICollection<PostedContent> PostedContents { get; set; } = new List<PostedContent>();
    [JsonIgnore]

    public virtual ICollection<UserFollower> UserFollowerFollowsUsers { get; set; } = new List<UserFollower>();
    [JsonIgnore]

    public virtual ICollection<UserFollower> UserFollowerThisUsers { get; set; } = new List<UserFollower>();
}
