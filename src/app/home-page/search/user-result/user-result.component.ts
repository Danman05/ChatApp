import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserDB } from 'src/app/Model/userDbModel';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-user-result',
  templateUrl: './user-result.component.html',
  styleUrls: ['./user-result.component.scss']
})
export class UserResultComponent implements OnChanges {
  @Input() searchTerm: string = "";
  filteredUsers?: UserDB[]; 

  constructor(private userService: UserDataService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filteredUsers = this.userService.userList.filter(x => x.username.includes(this.searchTerm));
  }
}
