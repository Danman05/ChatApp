import {Component, EventEmitter,  Input, ViewChild, Output, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { userProfile } from 'src/app/Model/userProfile';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.scss'],
})
export class AdminBoardComponent implements OnChanges {
  @Input() userList: userProfile[] = [];
 
  displayedUserColoumns: string[] = ['Buttons','User ID', 'Profile Picture', '@Username', 'Display Name', 'Verified', 'Private', 'Creation Date'];
  userdataSource = new MatTableDataSource<userProfile>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Output() callDeleteUser = new EventEmitter<userProfile>();
  @Output() callEditUser = new EventEmitter<userProfile>();

  ngOnChanges(changes: SimpleChanges): void {
    this.userdataSource = new MatTableDataSource<userProfile>(this.userList)
    this.userdataSource.paginator = this.paginator;
  }
  editUser(user: userProfile) {
    this.callEditUser.emit(user);
  }
  deleteUser(user: userProfile) {
    this.callDeleteUser.emit(user);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userdataSource.filter = filterValue.trim().toLowerCase();
  }
}
