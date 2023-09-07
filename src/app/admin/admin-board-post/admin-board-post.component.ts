import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild, OnInit } from '@angular/core';
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

  @Output() callDeletePost = new EventEmitter<UserPost>();
  @Output() callEditPost = new EventEmitter<UserPost>();

  userdataSource = new MatTableDataSource<UserPost>();
  displayedUserColoumns: string[] = [
    'Buttons',
    'Post ID',
    'Poster User',
    'Title',
    'Content'
  ];

  @ViewChild(MatPaginator) set paginator(paginator: MatPaginator) {
    if (paginator) {
      this.userdataSource.paginator = paginator;
    }
  }; 

  ngOnChanges(changes: SimpleChanges): void {
    this.userdataSource = new MatTableDataSource<UserPost>(this.postList);
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
