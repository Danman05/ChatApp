import { Component, Input, OnInit } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import { userProfile } from '../Model/userProfile';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit{

  userList!: userProfile[];
  
  constructor(private userService: UserDataService) {

  }
  ngOnInit(): void {
    this.userList = this.userService.userList;
  }
}

