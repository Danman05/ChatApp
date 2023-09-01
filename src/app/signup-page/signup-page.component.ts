import { Component } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import { UserDB } from '../Model/userDbModel';
import { Router } from '@angular/router';
import { userProfile } from '../Model/userProfile';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent {
  
  username: string = '';
  password: string = '';
  passwordVerify: string = '';
  displayName: string = '';
  profilePicturePath?: string;
  isPrivate: boolean = false;

  shouldMoveToNextForm: boolean = false;
  notValidForm: boolean = false;
  errorMessages: string[] = [];

  signedUpUser?: userProfile;
  constructor(private userService: UserDataService, private router: Router) { }

  nextForm() {
    this.shouldMoveToNextForm = true;
  }
  onRadioChange(event: any) {
    this.profilePicturePath = event.target.value; // Update the selected option
  }

  checkUsername(): void {
    if (this.userService.userList.find(x => x.username == this.username))
      this.errorMessages[0] = "Username already exists";
    else
      this.errorMessages[0] = "";

    if(this.username.length < 1)
      this.errorMessages[1] = "Username not long enough";
    else
      this.errorMessages[1] = "";
  }
  checkPassword(): void {

    if (this.password.length < 7)
      this.errorMessages[2] = "Password is not long enough";
    else
      this.errorMessages[2] = "";

    if (this.password != this.passwordVerify)
      this.errorMessages[3] = "Passwords does not match";
    else
      this.errorMessages[3] = "";
  }
  onSignUp() {

    this.checkUsername();
    this.checkPassword();

    if (this.errorMessages[0].length > 0 || this.errorMessages[1].length > 0 || this.errorMessages[2].length > 0 || this.errorMessages[3].length > 0) {
      return;
    }


    const userData: UserDB = {
      username: this.username,
      password: this.password,
      displayName: this.displayName,
      profilePicturePath: this.profilePicturePath,
      isPrivate: this.isPrivate,
    };

    this.userService.CreateUser(userData)
      .subscribe({
        next: (data => {
          this.userService.GetData()
            .subscribe({
              next: (data => {
                this.userService.userList = data;
                this.signedUpUser = this.userService.userList.find(x => x.username == this.username);
                this.router.navigate(['/app-profile-page', this.signedUpUser?.userId]);
              }),
            });
        }),
        error: (error => {
          console.error('Error registering user', error);
        }),
      });
  }
}
