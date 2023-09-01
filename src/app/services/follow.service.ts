import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserFollow } from '../Model/userFollow';
@Injectable({
    providedIn: 'root'
})
export class FollowService {

    endpoint: string = 'http://localhost:5006/Follow/';


    constructor(private httpClient: HttpClient) { }

    follow(userFollow: UserFollow): Observable<boolean> {
        return this.httpClient.post<boolean>(`${this.endpoint}Follow`, userFollow);
    }

    checkFollow(userFollow: UserFollow): Observable<boolean> {
        return this.httpClient.get<boolean>(`${this.endpoint}CheckFollow?followerUserId=${userFollow.thisUserId}&followedUserId=${userFollow.followsUserId}`);
    }
}
