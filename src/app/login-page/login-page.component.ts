import { Component } from '@angular/core';
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

  constructor(private loginService: LoginService, private router: Router, private authService: AuthService) {
  }
  async SignIn(usercred: UserCred) {
    const isSignedIn = await this.loginService.signIn(usercred);
    
    if (isSignedIn) {
      // Navigate to profile page
      this.authService.setIsLoggedIn(true);
      this.router.navigate(['app-profile-page', this.loginService.signedInUser.userId]);
    }
  }
}
