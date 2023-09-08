import { Component, OnInit } from '@angular/core';
import { userProfile } from '../Model/userProfile';
import { UserPost } from '../Model/userPost';
import { LoginService } from '../services/login.service';
import { PostService } from '../services/post.service';
import { UserDataService } from '../services/user-data.service';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  adminLogin$: Observable<boolean> = this.authService.isAdmin$;

  userList: userProfile[] = [];
  postList: UserPost[] = [];

  constructor(private postService: PostService,
    private userService: UserDataService, private authService: AuthService) {
  }
  ngOnInit(): void {
    this.refreshUser();
    this.refreshPost();
  }
  editUser(user: userProfile) {
    console.log(user);
    this.userService.EditUser(user).subscribe(res => {
      console.log(res);
      this.refreshUser();
      this.refreshPost();
    });
  }
  deleteUser(user: userProfile) {
    console.log(user);
    this.userService.deleteUser(user).subscribe(res => {
      console.log(res);
      this.refreshUser();
      this.refreshPost();
    });
  }
  editPost(post: UserPost) {
    console.log(post);
    this.postService.editPost(post).subscribe(res => {
      console.log(res);
      this.refreshPost();
    });
  }
  deletePost(post: UserPost) {
    this.postService.deletePost(post).subscribe(res => {
      this.refreshPost();
    });
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
