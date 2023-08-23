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

    public virtual DbSet<UserFollower> UserFollowers { get; set; }

    public virtual DbSet<NewUser> NewUsers { get; set; }

    public virtual DbSet<FollowerResult> FollowerResults { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PostedContent>(entity =>
        {
            entity.HasKey(e => e.PostId).HasName("PK__PostedCo__DD0C73BA64B96FAF");

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
            entity.Property(e => e.PosterUserId).HasColumnName("posterUserID");
            entity.Property(e => e.Title)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("title");

            entity.HasOne(d => d.PosterUser).WithMany(p => p.PostedContents)
                .HasForeignKey(d => d.PosterUserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__PostedCon__poste__76969D2E");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__User__CB9A1CDFD63CAF9F");

            entity.ToTable("User");

            entity.Property(e => e.UserId).HasColumnName("userID");
            entity.Property(e => e.AccountCreationDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("accountCreationDate");
            entity.Property(e => e.DisplayName)
                .HasMaxLength(24)
                .IsUnicode(false)
                .HasColumnName("displayName");
            entity.Property(e => e.IsPrivate).HasColumnName("isPrivate");
            entity.Property(e => e.IsVerified).HasColumnName("isVerified");
            entity.Property(e => e.Password)
                .HasMaxLength(32)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.ProfilePicturePath)
                .IsUnicode(false)
                .HasColumnName("profilePicturePath");
            entity.Property(e => e.Username)
                .HasMaxLength(24)
                .IsUnicode(false)
                .HasColumnName("username");
        });

        modelBuilder.Entity<UserFollower>(entity =>
        {
            entity.HasKey(e => e.FollowId).HasName("PK__UserFoll__71C0453649DFA857");

            entity.Property(e => e.FollowId).HasColumnName("followID");
            entity.Property(e => e.FollowDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("followDate");
            entity.Property(e => e.FollowsUserId).HasColumnName("followsUserID");
            entity.Property(e => e.ThisUserId).HasColumnName("thisUserID");

            entity.HasOne(d => d.FollowsUser).WithMany(p => p.UserFollowerFollowsUsers)
                .HasForeignKey(d => d.FollowsUserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserFollo__follo__72C60C4A");

            entity.HasOne(d => d.ThisUser).WithMany(p => p.UserFollowerThisUsers)
                .HasForeignKey(d => d.ThisUserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserFollo__thisU__71D1E811");
        });
        modelBuilder.Entity<FollowerResult>(entity => {
            entity.HasNoKey();
            
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
