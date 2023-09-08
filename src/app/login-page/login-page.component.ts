import { Component, EventEmitter, Output } from '@angular/core';
import { UserCred } from '../Model/userCred';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  userCred: UserCred = {username: "", password: ""};
  errorMessages: string[] = [];
  constructor(private loginService: LoginService, private router: Router, private authService: AuthService) {
  }
  async SignIn() {
    
    if(!this.userCred.username  || !this.userCred.password) {
      this.errorMessages[0] = "Fill every field";
      return;
    }
    
    const isSignedIn: boolean = await this.loginService.signIn(this.userCred);

    if (isSignedIn && this.userCred.username != "Admin") {
      // Navigate to profile page
      this.authService.setIsLoggedIn(true);
      this.router.navigate(['app-profile-page', this.loginService.signedInUser.userId]);
    }
    else if (isSignedIn && this.userCred.username == "Admin") {
      this.authService.setIsLoggedIn(true);
      this.authService.setIsAdmin(true);

      this.router.navigate(['admin']);
    }
    else {
      this.errorMessages[0] = "Login Failed";
    }
  }
}
