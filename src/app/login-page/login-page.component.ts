import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  @Output() signIn = new EventEmitter<{username: string, password: string}>();

  emitSignIn(credentialUsername: string, credentialPassword: string) {
    this.signIn.emit({username: credentialUsername, password: credentialPassword});
  }
}
