import { Component, OnInit } from '@angular/core';
import { User } from './Model/userModel';
import { LoginService } from './services/login.service';
import { UserCred } from './Model/userCred';
import { UserDataService } from './services/user-data.service';
import { UserDB } from '../app/Model/userDbModel';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Y';
  dataLoaded: boolean = false;
  isSignedIn: boolean = false;
  userList: User[] = [];

  dbUserList: UserDB[] = [];
  constructor(private userService: LoginService, private userDbService: UserDataService) {
  }
  
  // can be used to simulate data retrivel
  // setTimeout(() => {
    // API Calls goes here
  // }, 1500);
  ngOnInit(): void {
    this.userDbService.GetData()
      .subscribe({
        next: (data => {
          this.userDbService.userList = data;
          this.dataLoaded = true;
        }),
        error: (response => {
          console.log(response);
        })
      });
  }

  signIn(credentials: UserCred): void {
    this.isSignedIn = this.userService.signIn(credentials);
  }

  signOut(): void {
    this.isSignedIn = this.userService.signOut();
  }


}
