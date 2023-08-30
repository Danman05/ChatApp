import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LoginService } from './services/login.service';
import { UserCred } from './Model/userCred';
import { UserDataService } from './services/user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Y';
  dataLoaded: boolean = false;


  constructor(private loginService: LoginService, private userService: UserDataService) {
  }
  
  // can be used to simulate data retrivel
  // setTimeout(() => {
    // API Calls goes here
  // }, 1500);
  ngOnInit(): void {
    this.userService.GetData()
      .subscribe({
        next: (data => {
          this.userService.userList = data;
          this.dataLoaded = true;
        }),
        error: (response => {
          console.log(response);
        })
      });
  }

  signOut(): void {
    this.loginService.signOut();
  }
}
