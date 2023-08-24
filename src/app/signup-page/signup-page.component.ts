import { Component } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import { UserDB } from '../Model/userDbModel';
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
  isVerified: boolean = false;
  isPrivate: boolean = false;

  shouldMoveToNextForm: boolean = false;
  notValidForm: boolean = false;
  errorMessages: string[] = [];

  constructor(private httpService: UserDataService, private userService: UserDataService) {

  }
  nextForm() {
    this.shouldMoveToNextForm = true;
  }
  onRadioChange(event: any) {
    this.profilePicturePath = event.target.value; // Update the selected option
  }

  checkUsername(): void {
    console.log("checking username");
    if (this.userService.userList.find(x => x.username == this.username)) {
      this.errorMessages[0] = "Username already exists";
      return;
    }
    this.errorMessages[0] = ""; 
  }
  checkPassword(): void {
    console.log("checking password");
    if (this.password != this.passwordVerify) {
      this.errorMessages[1] = "Passwords does not match";
      return;
    }
    this.errorMessages[1] = "";
  }
  onSignUp() {
    if (this.errorMessages[0].length > 0 || this.errorMessages[1].length > 0) {
      console.log(this.errorMessages[0], " | ", this.errorMessages[1]);
      console.log("can't register user, fix errors");
      return;
    }

    
    const userData: UserDB = {
      username: this.username,
      password: this.password,
      displayName: this.displayName,
      profilePicturePath: this.profilePicturePath,
      isPrivate: this.isPrivate,
      isVerified: this.isVerified
    };

    this.httpService.CreateUser(userData)
      .subscribe({
        next: (data => {
          console.log('User registered successfully', data);
        }),
        error: (error => {
          console.error('Error registering user', error);
        }),
      });
  }
}
