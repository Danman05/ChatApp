import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../Model/userModel';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() userList!: User[];
  @Input() currentUser!: User; 
  @Input() isSignedIn: boolean = false;
  @Output() signIn = new EventEmitter<void>();
  @Output() signOut = new EventEmitter<void>();

  isMenuOpen = false;

  emitSignIn() {
    this.signIn.emit();
  }
  emitSignOut() {
    this.signOut.emit();
  }
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
