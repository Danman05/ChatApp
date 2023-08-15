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
  isSignedIn = false;
  userList: User[] = [
    new User("Bobby", "Bobby123", "../../assets/guest.png"),
    new User("Daniel", "Daniel@123", "../../assets/guest2.png")
  ];
  currentUser!: User; 
  constructor(private userService: LoginService) {
    this.currentUser = this.userList[0];
  }


  signOut() : void {
    this.isSignedIn = this.userService.signOut();
    this.currentUser = this.userService.signedInUser;
    console.log(this.isSignedIn);
    
  }

  signIn() : void {
    this.isSignedIn = this.userService.signIn();
    this.currentUser = this.userService.signedInUser;
    console.log(this.isSignedIn);
  }
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
