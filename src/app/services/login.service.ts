import { Injectable } from '@angular/core';
import { User } from '../Model/userModel';
import { UserCred } from '../Model/userCred';
import { UserDataService } from './user-data.service';
import { UserDB } from '../Model/userDbModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  signedInUser!: UserDB;
  isSignedIn:boolean = false;
  // userList: User[] = [
  //   new User("Bobby", "Bobby123", "Kode1234!", "../../assets/guest.png"),
  //   new User("Daniel", "Daniel123", "Kode1234!", "../../assets/guest2.png"),
  //   new User("Test", "TestAccount", "Kode1234!", "" , 1, 79817367362, false, true),
  // ];
  
  constructor(private userService: UserDataService) { }
  signIn(credentials: UserCred) {
    
    let user = this.userService.userList.find(x => x.username == credentials.username);
    
    if (!user || user.password !== credentials.password) {
      return false;
    }
    this.signedInUser = user;
    this.isSignedIn = true;
    return true;
  }

  signOut() {
    this.signedInUser = null!;
    this.isSignedIn = false;
    return false;
  }
}