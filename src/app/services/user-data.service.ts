import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { userProfile } from '../Model/userProfile';
import { UserDB } from '../Model/userDbModel';


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
  CreateUser(user: UserDB) : Observable<UserDB[]> {
    return this.httpClient.post<UserDB[]>(`${this.endpoint}Register`, user );
  }
  EditUser(user: userProfile): Observable<userProfile[]> {
    return this.httpClient.put<userProfile[]>(`${this.endpoint}EditProfile`, user);
  }
  DeleteUser(user: userProfile): Observable<userProfile[]> {
    return this.httpClient.delete<userProfile[]>(`${this.endpoint}Delete?id=${user.userId}`);
  }
}
