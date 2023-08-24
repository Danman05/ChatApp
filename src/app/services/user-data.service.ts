import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { User } from '../Model/userModel';
import { UserDB } from '../Model/userDbModel';


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

  CreateUser(user: UserDB) : Observable<UserDB[]> {
    return this.httpClient.post<UserDB[]>(`${this.endpoint}Register`, user );
  }
}
