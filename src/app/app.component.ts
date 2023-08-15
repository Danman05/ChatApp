import { Component } from '@angular/core';
import { User } from './Model/userModel';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ChatApp';
  isSignedIn: boolean = false;
  showLogin: boolean = false;
  navigateTo: string = "";
  userList: User[] = [
    new User("Bobby", "Bobby123", "../../assets/guest.png"),
    new User("Daniel", "Daniel@123", "../../assets/guest2.png"),
    new User("Test", "TestAccount000WOW", "", 1, 79817367362, false, true),
  ];
  currentUser!: User; 
  constructor(private userService: LoginService) {
  }

  signOut() : void {
    this.isSignedIn = this.userService.signOut();
    this.currentUser = this.userService.signedInUser;
    this.navigateTo = "homePage";
    console.log(this.isSignedIn);
    
  }

  signIn(credentials: string) : void {
    console.log(credentials);
    this.isSignedIn = this.userService.signIn(credentials);
    this.currentUser = this.userService.signedInUser;
    console.log(this.isSignedIn);
  }
  isMenuOpen = false;

  setNavigation(navigateTo: string) : void {
    this.navigateTo = navigateTo;
    console.log(navigateTo);
  }
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
