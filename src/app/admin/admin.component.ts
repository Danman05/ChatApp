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
    this.adminLogin = loginService.isAdmin;

    this.postService.getPosts().subscribe({
      next: (data => {
        this.postList = data;
        console.log(this.postList);
      }),
      error: (error => {
      })
    });
    this.userService.GetData().subscribe({
      next: (data => {
        this.userList = data;
        console.log(this.userList);
      }),
      error: (error => {
      })
    });
  }
  ngOnInit(): void {
    // this.userList = this.userService.GetData();
    // this.postList = this.postService.getPosts();
  }
  test(){
    console.log("test");
  }
}
