using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Models;

public partial class UserFollower
{
    public int FollowId { get; set; }

    public int ThisUserId { get; set; }

    public int FollowsUserId { get; set; }
    public DateTime? FollowDate { get; set; }

    public virtual User FollowsUser { get; set; } = null!;

    public virtual User ThisUser { get; set; } = null!;
}
