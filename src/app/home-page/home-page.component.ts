import { Component, Input, OnInit } from '@angular/core';
import { UserDB } from '../Model/userDbModel';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit{

  userList!: UserDB[];
  
  constructor(private userService: UserDataService) {

  }
  ngOnInit(): void {
    this.userList = this.userService.userList;
  }
}

