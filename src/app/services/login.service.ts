import { Injectable } from '@angular/core';
import { User } from '../Model/userModel';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  signedInUser!: User;
  userList: User[] = [
    new User("Bobby", "Bobby123", "../../assets/guest.png"),
    new User("Daniel", "Daniel123Danny", "../../assets/guest2.png"),
    new User("Test", "TestAccount000WOW", "", 1, 79817367362, false, true),
  ];

  signIn(credentials: any) {
    let user = this.userList.find(x => x.displayName == credentials.username);
    if (user) {
      this.signedInUser = user;
      return true;
    }
    return false;
  }

  signOut() {
    this.signedInUser = null!;
    return false;
  }
  constructor() { }
}