import { Component } from '@angular/core';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent {
  maxTitleLength = 50;
  maxContentLength = 500;
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
    if (this.postTitle.length > this.maxTitleLength) {
      this.postTitle = this.postTitle.slice(0, this.maxTitleLength);
    }
  }
  checkContent() {
    console.log("Checking Title");
    console.log(`content length ${this.postContent.length}`);
    if (this.postContent.length > this.maxContentLength) {
      this.postContent = this.postContent.slice(0, this.maxContentLength);
    }
  }
}
