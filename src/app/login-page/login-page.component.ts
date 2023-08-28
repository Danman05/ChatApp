import { Component } from '@angular/core';
import { UserCred } from '../Model/userCred';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  constructor(private loginService: LoginService, private router: Router) {
  }
  SignIn(usercred: UserCred) {
    if(this.loginService.signIn(usercred))
    { 
      this.router.navigate(['app-profile-page', this.loginService.signedInUser.userId]);
    }
  }
}
