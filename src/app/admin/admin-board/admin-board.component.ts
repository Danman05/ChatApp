import { Component, Input } from '@angular/core';
import { UserPost } from 'src/app/Model/userPost';
import { userProfile } from 'src/app/Model/userProfile';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.scss']
})
export class AdminBoardComponent {
  @Input() userList: userProfile[] = [];
  @Input() postList: UserPost[] = [];
}
