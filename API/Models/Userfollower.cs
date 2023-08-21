using System;
using System.Collections.Generic;

namespace API.Models;

public partial class Userfollower
{
    public int FollowId { get; set; }

    public int UserId { get; set; }

    public int FollowedUserId { get; set; }

    public virtual User User { get; set; } = null!;
}
