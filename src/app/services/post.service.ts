import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPost } from '../Model/userPost';
@Injectable({
    providedIn: 'root'
})
export class PostService {

    endpoint: string = 'http://localhost:5006/Post/';
    constructor(private httpClient: HttpClient) { }

    createPost(userPost: UserPost): Observable<UserPost[]> {
        return this.httpClient.post<UserPost[]>(`${this.endpoint}Create`, userPost);
    }
    getPosts(): Observable<UserPost[]> {
        return this.httpClient.get<UserPost[]>(`${this.endpoint}GetAll`);
    }
}
