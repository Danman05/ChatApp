import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  @Input() showLogin: boolean = true;
  @Output() signIn = new EventEmitter<string>();

  emitSignIn(credential: string) {
    this.signIn.emit(credential);
  }
}
