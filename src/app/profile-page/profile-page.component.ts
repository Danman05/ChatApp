import { Component, OnInit, numberAttribute } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserDataService } from '../services/user-data.service';
import { userProfile } from '../Model/userProfile';
import { LoginService } from '../services/login.service';
import { FollowService } from '../services/follow.service';
import { UserFollow } from '../Model/userFollow';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  currentUser!: userProfile;
  ownsAccount: boolean = false;
  isSignedIn: boolean = false;
  isFollowingUser = false;
  id?: number;
  constructor(private userService: UserDataService, private loginService: LoginService,
    private followService: FollowService, private route: ActivatedRoute, private router: Router) { }

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

  checkFollow() {
    let userFollow: UserFollow = {
      thisUserId: this.loginService.signedInUser.userId!,
      followsUserId: this.id!,
    }
    this.followService.checkFollow(userFollow).subscribe({
      next: (data => {
        this.isFollowingUser = data;
      }),
      error: (error => {
        console.log(error);
      }),
    });
  }
  editProfile() {

  }
  followUser() {
    let userFollow: UserFollow = {
      thisUserId: this.loginService.signedInUser.userId!,
      followsUserId: this.id!,
    }
    this.followService.follow(userFollow).subscribe({
      next: (data => {
        console.log(data);
        this.getProfileData();
      }),
      error: (data => {
        console.log(data);
      })
    })
  }

  getProfileData() {
    this.userService.GetProfileData(this.id!)
      .subscribe({
        next: (result => {

          this.currentUser = result[0];
          this.isSignedIn = this.loginService.isSignedIn;

          if (this.loginService.signedInUser && this.loginService.signedInUser.userId == this.currentUser.userId)
            this.ownsAccount = true;

          if (this.isSignedIn && !this.ownsAccount) {

            this.checkFollow();
          }

        }),
        error: (error => {
          console.log(error);
        }),
      });
  }

}
