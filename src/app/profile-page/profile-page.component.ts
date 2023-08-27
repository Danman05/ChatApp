import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserDataService } from '../services/user-data.service';
import { userProfile } from '../Model/userProfile';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit{
  currentUser!: userProfile; 
  id?: number;
  constructor(private userService: UserDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id')!;
    });
    this.userService.GetProfileData(this.id!)
    .subscribe({
      next: (result => {
        this.currentUser = result[0];
      }),
      error: (error => {
        console.log(error);
      }),
    });
  }
}
