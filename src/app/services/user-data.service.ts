import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { UserDB } from '../Model/userDbModel';
import { userProfile } from '../Model/userProfile';


@Injectable({
  providedIn: 'root'
})

export class UserDataService {

  endpoint: string = 'http://localhost:5006/User/';
  userList: UserDB[] = [];
  constructor(private httpClient: HttpClient) { }


  GetData() : Observable<UserDB[]> {
    
    return this.httpClient.get<UserDB[]>(`${this.endpoint}GetAll`);
  }

  GetUser(id: number) : UserDB {
    return this.userList.find(x => x.userId === id)!;
  }
  GetProfileData(id: number): Observable<userProfile[]> {
    return this.httpClient.get<userProfile[]>(`${this.endpoint}ProfileData?id=${id}`)
  }
  CreateUser(user: UserDB) : Observable<UserDB[]> {
    return this.httpClient.post<UserDB[]>(`${this.endpoint}Register`, user );
  }
}
