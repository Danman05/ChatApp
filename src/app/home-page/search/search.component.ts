import { Component } from '@angular/core';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchValue: string = "";
  showUsers: boolean = false;

  searchUser(value: any) {
    this.searchValue = value.target.value
    if (this.searchValue.length >= 2) {
      this.showUsers = true;
    }
    else {
      this.showUsers = false;
    }
  }
}
