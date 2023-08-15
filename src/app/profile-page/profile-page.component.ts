import { Component, Input } from '@angular/core';
import { User } from '../Model/userModel';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  @Input() currentUser!: User; 
}
