import { Component, Input, OnInit } from '@angular/core';
import { User } from '../Model/userModel';
import { LoginService } from '../services/login.service';
import { UserDB } from '../Model/userDbModel';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit{
  currentUser!: UserDB; 

  constructor(private loginService: LoginService) {
    
  }

  ngOnInit(): void {
    this.currentUser = this.loginService.signedInUser;
    console.log(this.currentUser);
  }

}
