import { Injectable } from '@angular/core';
import { UserCred } from '../Model/userCred';
import { UserDataService } from './user-data.service';
import { userProfile } from '../Model/userProfile';


@Injectable({
  providedIn: 'root'
})
export class LoginService {


  signedInUser!: userProfile;
  isSignedIn:boolean = false;
  
  constructor(private userService: UserDataService) { }
  
  async signIn(credentials: UserCred): Promise<boolean> {
    this.isSignedIn = false;

    try {
      const data = await this.userService.LogIn(credentials).toPromise();

      if (data && data.length > 0) {
        this.signedInUser = data[0];
        this.isSignedIn = true;
        return true;
      }
      return false;
    } catch (error) {
      // console.log(error);
      console.log("Login failed");
      return false;
    }
  }

  signOut() {
    this.signedInUser = null!;
    this.isSignedIn = false;
  }

  getSign() {
    return this.isSignedIn;
  }
}