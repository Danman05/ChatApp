import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output() signOut = new EventEmitter<void>();

  isMenuOpen = false;
  // isSignedIn: boolean;
  isSignedIn$ = this.authService.isLoggedIn$;

  constructor(private authService: AuthService, private router: Router, private loginService: LoginService) {} 
  emitSignOut(): void {
    this.authService.setIsLoggedIn(false);
    this.signOut.emit();
  }
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  viewProfile() {
    this.router.navigate(["app-profile-page", this.loginService.signedInUser.userId])
  }
}
