import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import { UserCred } from '../Model/userCred';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  constructor(private loginService: LoginService) {
  }
  SignIn(usercred: UserCred) {
    this.loginService.signIn(usercred);
  }
}
