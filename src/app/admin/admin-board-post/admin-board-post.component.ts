import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserPost } from 'src/app/Model/userPost';
@Component({
  selector: 'app-admin-board-post',
  templateUrl: './admin-board-post.component.html',
  styleUrls: ['./admin-board-post.component.scss']
})
export class AdminBoardPostComponent implements OnChanges{
  @Input() postList: UserPost[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Output() callDeletePost = new EventEmitter<UserPost>();
  @Output() callEditPost = new EventEmitter<UserPost>();
  displayedUserColoumns: string[] = ['Buttons','Post ID', 'Poster User', 'Title', 'Content'];
  userdataSource = new MatTableDataSource<UserPost>();

  ngOnChanges(changes: SimpleChanges): void {
    this.userdataSource = new MatTableDataSource<UserPost>(this.postList)
    this.userdataSource.paginator = this.paginator;
    
  }

  editPost(post: UserPost) {
    this.callEditPost.emit(post);
  }
  deletePost(post: UserPost) {
    this.callDeletePost.emit(post);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userdataSource.filter = filterValue.trim().toLowerCase();
  }

}
