using System;
using System.Collections.Generic;

namespace API.Models;

public partial class NewUser
{
    public int NewUserId { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string DisplayName { get; set; } = null!;

    public string? ProfilePicturePath { get; set; }

    public bool IsPrivate { get; set; }

    public bool IsVerified { get; set; }

    public DateTime? AccountCreationDate { get; set; }
}
