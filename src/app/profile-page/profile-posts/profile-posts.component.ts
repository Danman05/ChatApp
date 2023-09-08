import { Component, Input, OnInit } from '@angular/core';
import { UserPost } from 'src/app/Model/userPost';
import { userProfile } from 'src/app/Model/userProfile';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.scss']
})
export class ProfilePostsComponent implements OnInit {
  
  @Input() currentUser: userProfile = new userProfile;
  userPosts: UserPost[] = [];
  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    if (this.currentUser.userId != null) {
      this.postService.getUserPosts(this.currentUser.userId).subscribe(res => {
        this.userPosts = res;
      });
    }

  }


}
