import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { userProfile } from '../Model/userProfile';
import { UserCred } from '../Model/userCred';


@Injectable({
  providedIn: 'root'
})

export class UserDataService {

  endpoint: string = 'http://localhost:5006/User/';
  userList: userProfile[] = [];
  constructor(private httpClient: HttpClient) { }


  GetData() : Observable<userProfile[]> {
    
    return this.httpClient.get<userProfile[]>(`${this.endpoint}GetAll`);
  }

  GetUser(id: number) : userProfile {
    return this.userList.find(x => x.userId === id)!;
  }
  GetProfileData(id: number): Observable<userProfile[]> {
    return this.httpClient.get<userProfile[]>(`${this.endpoint}ProfileData?id=${id}`)
  } 
  CreateUser(user: userProfile) : Observable<userProfile[]> {
    return this.httpClient.post<userProfile[]>(`${this.endpoint}Register`, user );
  }
  LogIn(cred: UserCred): Observable<userProfile[]> {
    return this.httpClient.get<userProfile[]>(`${this.endpoint}Login?username=${cred.username}&password=${cred.password}`)
  }
}
