import { Injectable } from '@angular/core';
import { User } from '../Model/userModel';
import { UserCred } from '../Model/userCred';
import { UrlSegment } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  signedInUser!: User;
  userList: User[] = [
    new User("Bobby", "Bobby123", "Kode1234!", "../../assets/guest.png"),
    new User("Daniel", "Daniel123", "Kode1234!", "../../assets/guest2.png"),
    new User("Test", "TestAccount", "Kode1234!", "" , 1, 79817367362, false, true),
  ];

  signIn(credentials: UserCred) {
    
    let user = this.userList.find(x => x.username == credentials.username);
    console.log(user);

    if (!user || user.password !== credentials.password) {
      return false;
    }
    this.signedInUser = user;
    return true;
  }

  signOut() {
    this.signedInUser = null!;
    return false;
  }
  constructor() { }
}