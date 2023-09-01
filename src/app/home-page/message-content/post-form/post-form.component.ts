import { Component } from '@angular/core';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent {
  postTitle: string = "";
  postContent: string = "";
  errorMessages: string[] = [];
  onCreatePost() {
    console.log("Created Post");
    console.log(this.postTitle);
    console.log(this.postContent);
  }
  checkTitle() {
    console.log("Checking Title");
    console.log(`title length ${this.postTitle.length}`);
  }
  checkContent() {
    console.log("Checking Title");
    console.log(`content length ${this.postContent.length}`);
  }
}
