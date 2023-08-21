using System;
using System.Collections.Generic;

namespace API.Models;

public partial class PostedContent
{
    public int PostId { get; set; }

    public int UserId { get; set; }

    public string Title { get; set; } = null!;

    public string Content { get; set; } = null!;

    public DateTime? BlogCreationDate { get; set; }

    public virtual User User { get; set; } = null!;
}
