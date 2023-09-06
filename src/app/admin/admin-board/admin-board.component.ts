import {AfterViewInit, Component, EventEmitter,  Input, ViewChild, Output } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserPost } from 'src/app/Model/userPost';
import { userProfile } from 'src/app/Model/userProfile';
8
@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.scss'],
})
export class AdminBoardComponent implements AfterViewInit {
  @Input() userList: userProfile[] = [];
  @Input() postList: UserPost[] = [];
  ELEMENT_DATA: userProfile[] = [
    { userId: 1, username: 'Hydrogen', displayName: '1.0079', profilePicturePath: '', isVerified: false, isPrivate: false},]
  displayedUserColoumns: string[] = ['User ID', 'Profile Picture', '@Username', 'Display Name', 'Verified', 'Private', 'Creation Date'];
  userdataSource = new MatTableDataSource<userProfile>(this.userList);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Output() callDeleteUser = new EventEmitter<userProfile>();
  @Output() callEditUser = new EventEmitter<userProfile>();

  ngAfterViewInit(): void {
    this.userdataSource.paginator = this.paginator;
  }
  editUser(user: userProfile) {
    console.log(user);
    this.callEditUser.emit(user);
  }
  deleteUser(user: userProfile) {
    console.log(`deleting user ${user.userId}`);
    this.callDeleteUser.emit(user);
  }
}
