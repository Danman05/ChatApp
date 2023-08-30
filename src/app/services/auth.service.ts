import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isLoggedInSubject = new BehaviorSubject<boolean>(false);

    get isLoggedIn$(): Observable<boolean> {
        return this.isLoggedInSubject.asObservable();
    }
    

    setIsLoggedIn(value: boolean) {
        this.isLoggedInSubject.next(value);
    }
}
