import { Component, Input } from '@angular/core';
import { UserPost } from 'src/app/Model/userPost';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {

  @Input() postList: UserPost[] = [];

  

}
