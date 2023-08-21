using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace API.Models;

public partial class YeeterDbContext : DbContext
{
    public YeeterDbContext()
    {
    }

    public YeeterDbContext(DbContextOptions<YeeterDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<PostedContent> PostedContents { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Userfollower> Userfollowers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
        
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PostedContent>(entity =>
        {
            entity.HasKey(e => e.PostId).HasName("PK__PostedCo__DD0C73BA7659E4AF");

            entity.ToTable("PostedContent");

            entity.Property(e => e.PostId).HasColumnName("postID");
            entity.Property(e => e.BlogCreationDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("blogCreationDate");
            entity.Property(e => e.Content)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("content");
            entity.Property(e => e.Title)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("title");
            entity.Property(e => e.UserId).HasColumnName("userID");

            entity.HasOne(d => d.User).WithMany(p => p.PostedContents)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__PostedCon__blogC__37A5467C");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__user__CB9A1CDF3CA8D686");

            entity.ToTable("user");

            entity.HasIndex(e => e.Username, "UQ__user__F3DBC572D0D7A21C").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("userID");
            entity.Property(e => e.AccountCreationDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("accountCreationDate");
            entity.Property(e => e.DisplayName)
                .HasMaxLength(24)
                .IsUnicode(false)
                .HasColumnName("displayName");
            entity.Property(e => e.Password)
                .HasMaxLength(32)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.Username)
                .HasMaxLength(24)
                .IsUnicode(false)
                .HasColumnName("username");
        });

        modelBuilder.Entity<Userfollower>(entity =>
        {
            entity.HasKey(e => e.FollowId).HasName("PK__userfoll__71C045368A9D6738");

            entity.ToTable("userfollowers");

            entity.Property(e => e.FollowId).HasColumnName("followID");
            entity.Property(e => e.FollowedUserId).HasColumnName("followedUserID");
            entity.Property(e => e.UserId).HasColumnName("userID");

            entity.HasOne(d => d.User).WithMany(p => p.Userfollowers)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__userfollo__userI__2C3393D0");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
