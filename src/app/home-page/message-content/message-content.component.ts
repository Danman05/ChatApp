import { Component, OnInit } from '@angular/core';
import { UserPost } from 'src/app/Model/userPost';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-message-content',
  templateUrl: './message-content.component.html',
  styleUrls: ['./message-content.component.scss']
})
export class MessageContentComponent implements OnInit {

  isSignedIn$ = this.authService.isLoggedIn$;
  showPostForm = false; // Initially hidden

  postList: UserPost[] = [];

  constructor(private authService: AuthService, private postService: PostService) {
  }
  ngOnInit(): void {
    this.refreshPostList();
  }
  
  togglePostForm() {
    this.showPostForm = !this.showPostForm;
  }
  
  refreshPostList() {
    this.postService.getPosts().subscribe({
      next: (data => {
        this.postList = data;
        this.postList.forEach(element => {
          console.log(element.posterUser?.displayName);
        });
        console.log(this.postList);
      }),
      error: (error => {
        console.log(error);
      })
    });
  }

}
