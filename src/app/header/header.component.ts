import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../Model/userModel';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() isSignedIn: boolean = false;
  @Output() signOut = new EventEmitter<void>();
  @Output() navigation = new EventEmitter<string>();

  isMenuOpen = false;

  emitNavigation(navigateTo: string): void{
    this.navigation.emit(navigateTo);
  }
  emitSignOut(): void {
    this.signOut.emit();
  }
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
