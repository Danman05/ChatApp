import { Component, OnInit } from '@angular/core';
import { userProfile } from '../Model/userProfile';
import { UserPost } from '../Model/userPost';
import { LoginService } from '../services/login.service';
import { PostService } from '../services/post.service';
import { UserDataService } from '../services/user-data.service';
import { NEVER, Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  adminLogin: boolean = false;

  userList: userProfile[] = [];
  postList: UserPost[] = [];

  constructor(private loginService: LoginService, private postService: PostService,
    private userService: UserDataService) {
  }
  ngOnInit(): void {
    this.refreshUser();
    this.refreshPost();
  }
  editUser(user: userProfile) {
    console.log(user);
  }
  deleteUser(user: userProfile) {
    
    console.log(user);
  }
  editPost(post: UserPost) {
    console.log(post);
  }
  deletePost(post: UserPost) {
    console.log(post);
  }

  refreshUser() {
    this.userService.GetData().subscribe(res => {
      this.userList = res;
    });
  }
  refreshPost() {
    this.postService.getPosts().subscribe(res => {
      this.postList = res;
    });
  }
}
