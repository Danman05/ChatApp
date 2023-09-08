import { Component, OnInit, numberAttribute } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserDataService } from '../services/user-data.service';
import { userProfile } from '../Model/userProfile';
import { LoginService } from '../services/login.service';
import { FollowService } from '../services/follow.service';
import { UserFollow } from '../Model/userFollow';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EditProfileDialogComponent } from './edit-profile-dialog/edit-profile-dialog.component';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  currentUser!: userProfile;
  ownsAccount: boolean = false;
  isSignedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  isFollowingUser = false;
  dialogOpen: boolean = false;

  id?: number;
  constructor(private userService: UserDataService, private loginService: LoginService,
    private followService: FollowService, private route: ActivatedRoute, public dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    try {
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.id = +params.get('id')!;
      });
      this.getProfileData();
    } catch (error) {
      console.log(error);
    }
  }
  
  editProfile(user: userProfile): void {
    this.userService.EditUser(user).subscribe(res => {
      console.log(res);
    });
  }

  editProfileDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    if (!this.dialogOpen) {
      this.dialogOpen = true;

      const dialogRef = this.dialog.open(EditProfileDialogComponent, {
        data: { user: this.currentUser },
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

  getProfileData() {
    this.userService.GetProfileData(this.id!).subscribe(res => {
      this.currentUser = res[0];
      if (this.loginService.signedInUser && this.loginService.signedInUser.userId == this.currentUser.userId)
        this.ownsAccount = true;

      this.isSignedIn$.subscribe(isSignedIn => {
        if (isSignedIn && !this.ownsAccount) {
          this.checkFollow();
        }
      });
    });
  }

  followUser() {
    let userFollow: UserFollow = {
      thisUserId: this.loginService.signedInUser.userId!,
      followsUserId: this.id!,
    }
    this.followService.follow(userFollow).subscribe(res => {
      this.getProfileData();
    });
  }

  checkFollow() {
    let userFollow: UserFollow = {
      thisUserId: this.loginService.signedInUser.userId!,
      followsUserId: this.id!,
    }
    this.followService.checkFollow(userFollow).subscribe(res => {
      this.isFollowingUser = res;
    });
  }
}
