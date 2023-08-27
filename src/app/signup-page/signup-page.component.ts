import { Component } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import { UserDB } from '../Model/userDbModel';
import { Router } from '@angular/router';
import { compileNgModule } from '@angular/compiler';

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
  errorMessages: string[] = ["", ""];

  signedUpUser?: UserDB;
  constructor(private userService: UserDataService, private router: Router) {

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
          console.log('User registered successfully', data);
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
