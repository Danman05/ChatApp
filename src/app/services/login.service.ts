import { Injectable } from '@angular/core';
import { UserCred } from '../Model/userCred';
import { UserDataService } from './user-data.service';
import { UserDB } from '../Model/userDbModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  signedInUser!: UserDB;
  isSignedIn:boolean = false;
  
  constructor(private userService: UserDataService) { }
  
  signIn(credentials: UserCred) {
    
    let user = this.userService.userList.find(x => x.username == credentials.username);
    console.log(user);
    if (!user || user.password !== credentials.password) {
      console.log("Login failed");
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

  getSign() {
    return this.isSignedIn;
  }
}