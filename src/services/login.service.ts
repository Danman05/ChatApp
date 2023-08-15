import { Injectable } from '@angular/core';
import { User } from '../app/Model/userModel';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isSignedIn : boolean = false;
  signedInUser! : User;
  userList: User[] = [
    new User("Bobby", "Bobby123", "../../assets/guest.png"),
    new User("Daniel", "Daniel@123", "../../assets/guest2.png"),
    new User("Test", "TestAccount000WOW", "", 1, 79817367362, false, true),
  ];

  signIn(username: string) {
    let user = this.userList.find(x => x.displayName == username);
    console.log("Found user: " + user);
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