using System;
using System.Collections.Generic;

namespace API.Models;

public partial class User
{
    public int UserId { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string DisplayName { get; set; } = null!;

    public DateTime AccountCreationDate { get; set; }

    public virtual ICollection<PostedContent> PostedContents { get; set; } = new List<PostedContent>();

    public virtual ICollection<Userfollower> Userfollowers { get; set; } = new List<Userfollower>();
}
