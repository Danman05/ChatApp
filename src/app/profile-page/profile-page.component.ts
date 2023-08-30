import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserDataService } from '../services/user-data.service';
import { userProfile } from '../Model/userProfile';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  currentUser!: userProfile;
  ownsAccount: boolean = false;
  isSignedIn: boolean = false;
  id?: number;
  constructor(private userService: UserDataService, private loginService: LoginService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id')!;
    });
    this.userService.GetProfileData(this.id!)
      .subscribe({
        next: (result => {

          try {
            this.currentUser = result[0];
            this.isSignedIn = this.loginService.isSignedIn;

            if (this.loginService.signedInUser && this.loginService.signedInUser.userId == this.currentUser.userId)
              this.ownsAccount = true;

          } catch (error) {
            console.log(error);
          }

        }),
        error: (error => {
          console.log(error);
        }),
      });
  }
}
