import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-message-content',
  templateUrl: './message-content.component.html',
  styleUrls: ['./message-content.component.scss']
})
export class MessageContentComponent {

  isSignedIn$ = this.authService.isLoggedIn$;
  showPostForm = false; // Initially hidden


  constructor(private authService: AuthService) {
  }
  
  togglePostForm() {
    this.showPostForm = !this.showPostForm;
  }
  
}
