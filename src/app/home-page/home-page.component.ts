import { Component, Input } from '@angular/core';
import { User } from '../Model/userModel';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent {

  @Input() userList!: User[];
  
}

