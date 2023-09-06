import { Component, Input, OnInit } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import { userProfile } from '../Model/userProfile';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit{

  
  constructor() {

  }
  ngOnInit(): void {
  }
}

