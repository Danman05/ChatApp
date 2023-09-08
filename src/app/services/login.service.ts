//
// Service which is responsible for login context
//
import { Injectable } from '@angular/core';
import { UserCred } from '../Model/userCred';
import { userProfile } from '../Model/userProfile';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {


  signedInUser!: userProfile;
  isAdmin = false;
  constructor(private authService: AuthService) { }
  
  async signIn(credentials: UserCred): Promise<boolean> {
  
    try {
      const data = await this.authService.LogIn(credentials).toPromise();

      if (data && data.length > 0 && data[0].username !== 'Admin') {
        this.signedInUser = data[0];
        return true;
      }
      if(data && data.length > 0 && data[0].username === 'Admin' ) {
        this.signedInUser = data[0];
        this.isAdmin = true;
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  signOut() {
    this.signedInUser = null!;
  }
}