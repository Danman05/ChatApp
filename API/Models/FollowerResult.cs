using System;
using System.Collections.Generic;

namespace API.Models;

public partial class FollowerResult
{
    public int thisUserID {get; set; }
    public int userID { get; set; }

    public string username { get; set; } = null!;

    public string displayName { get; set; } = null!;

    public virtual int followsUserID { get; set; }
}
