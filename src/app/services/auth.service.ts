//
// Service which is responsible for authentication context
//
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { userProfile } from '../Model/userProfile';
import { UserCred } from '../Model/userCred';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    endpoint: string = 'http://localhost:5006/Auth/';
    private isLoggedInSubject = new BehaviorSubject<boolean>(false);
    private isAdmin = new BehaviorSubject<boolean>(false);

    constructor(private httpClient: HttpClient) { }

    get isLoggedIn$(): Observable<boolean> {
        return this.isLoggedInSubject.asObservable();
    }
    setIsLoggedIn(value: boolean) {
        this.isLoggedInSubject.next(value);
    }
    get isAdmin$(): Observable<boolean> {
        return this.isAdmin.asObservable();
    }
    setIsAdmin(value: boolean) {
        this.isAdmin.next(value);
    }
    LogIn(cred: UserCred): Observable<userProfile[]> {
        return this.httpClient.get<userProfile[]>(`${this.endpoint}Login?username=${cred.username}&password=${cred.password}`)
    }
}
