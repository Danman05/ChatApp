import { Component, EventEmitter, Output } from '@angular/core';
import { UserPost } from 'src/app/Model/userPost';
import { LoginService } from 'src/app/services/login.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent {
  maxTitleLength = 50;
  maxContentLength = 500;
  postTitle: string = "";
  postContent: string = "";
  errorMessages: string[] = [];

  @Output() refreshPostList = new EventEmitter<void>();
  post: UserPost = new UserPost;
  constructor(private postService: PostService, private loginService: LoginService) {

  }

  onCreatePost() {
    this.post.title = this.postTitle;
    this.post.content = this.postContent;
    this.post.posterUserId = this.loginService.signedInUser.userId;

    this.postService.createPost(this.post).subscribe({
      next: (data => {
      }),
      error: (error => {
        console.log(error)
      })
      
    });
  }
  checkTitle() {
    this.refreshPostList.emit();
    if (this.postTitle.length > this.maxTitleLength)
      this.postTitle = this.postTitle.slice(0, this.maxTitleLength);

  }
  checkContent() {
    if (this.postContent.length > this.maxContentLength)
      this.postContent = this.postContent.slice(0, this.maxContentLength);
  }
}
