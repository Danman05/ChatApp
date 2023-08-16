import { Component, OnInit } from '@angular/core';
import { User } from './Model/userModel';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Y';
  isSignedIn: boolean = false;
  navigateTo: string = "";
  userList: User[] = [];
  currentUser!: User; 
  constructor(private userService: LoginService) {
  }

  ngOnInit(): void {
    this.userList = this.userService.userList;
  }

  signOut() : void {
    this.isSignedIn = this.userService.signOut();
    this.currentUser = this.userService.signedInUser;
    this.navigateTo = "homePage";
  }

  signIn(credentials: any) : void {
    this.isSignedIn = this.userService.signIn(credentials);
    this.currentUser = this.userService.signedInUser;
  }

  // 
  setNavigation(navigateTo: string) : void {
    this.navigateTo = navigateTo;
  }
}
