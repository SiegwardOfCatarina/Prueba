import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private allUrl = '/api';
  constructor(private http: HttpClient) { }

  public getPosts(): Observable<Post[]>{
    const httpHeaders: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'});
    return this.http.get<Post[]>(`${this.allUrl}/all`, {headers: httpHeaders}).pipe(take(1));
  }

  public createPost(data: Post): Observable<Post>{
    return this.http.post<Post>(`${this.allUrl}/create`, data).pipe(take(1));
  }

  public editPost(data: Post): Observable<Post>{
    return this.http.put<Post>(`${this.allUrl}/edit/${data.id}`, data).pipe(take(1));
  }

  public getDetail(data: Post): Observable<Post>{
    return this.http.post<any>(`${this.allUrl}/details`, data).pipe(take(1));
  }
}
