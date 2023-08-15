import { Injectable } from '@angular/core';
import { User } from '../app/Model/userModel';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isSignedIn : boolean = false;
  signedInUser! : User;


  signIn() {
    this.signedInUser = new User("Daniel", "Daniel@123", "../../assets/guest2.png");
    return true;
  }

  signOut() {
    this.signedInUser = null!;
    return false;
  }
  constructor() { }
}