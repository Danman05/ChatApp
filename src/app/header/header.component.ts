import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() isSignedIn: boolean = false;
  @Output() signOut = new EventEmitter<void>();

  isMenuOpen = false;
  
  emitSignOut(): void {
    this.signOut.emit();
  }
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    console.log(this.isSignedIn);
  }
}
