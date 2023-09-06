import { Component, OnInit } from '@angular/core';
import { userProfile } from '../Model/userProfile';
import { UserPost } from '../Model/userPost';
import { LoginService } from '../services/login.service';
import { PostService } from '../services/post.service';
import { UserDataService } from '../services/user-data.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileDialogComponent } from 'src/app/profile-page/edit-profile-dialog/edit-profile-dialog.component';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  adminLogin: boolean = false;
  dialogOpen: boolean = false;
  userList: userProfile[] = [];
  postList: UserPost[] = [];
  
  constructor(private loginService: LoginService, private postService: PostService,
    private userService: UserDataService, public dialog: MatDialog) {
    this.adminLogin = loginService.isAdmin;

  }
  ngOnInit(): void {
    this.GetUsers();
    this.GetPost();
  }

  logInUpdater(){
    this.adminLogin = this.loginService.isAdmin
  }

// Users handlers
  GetUsers() {
    this.userService.GetData().subscribe({
      next: (data => {
        this.userList = data;
        console.log(this.userList);
      }),
      error: (error => {
        console.log(error);
      })
    });
  }
  DeleteUser(user: userProfile) {
    this.userService.DeleteUser(user).subscribe({
      next: (data => {
        console.log(data);
      }),
      error: (error => {
        console.log(error);
      })
    });
  }

  editProfileDialog(enterAnimationDuration: string, exitAnimationDuration: string, user: userProfile): void {
    if (!this.dialogOpen) {
      this.dialogOpen = true;

      const dialogRef = this.dialog.open(EditProfileDialogComponent, {
        data: { user: user },
        enterAnimationDuration,
        exitAnimationDuration,
      });
      dialogRef.afterClosed().subscribe((updatedUser: userProfile) => {
        this.dialogOpen = false;
        if (updatedUser) {
          this.editProfile(updatedUser);
        }
      });
    }
  }
  editProfile(user: userProfile): void {
    this.userService.EditUser(user).subscribe({
      next: (data => {
        console.log(data);
      }),
      error: (error => {

      })
    });

  }

// Posts handlers
  GetPost() {
    this.postService.getPosts().subscribe({
      next: (data => {
        this.postList = data;
        console.log(this.postList);
      }),
      error: (error => {
        console.log(error);
      })
    });
  }
}
