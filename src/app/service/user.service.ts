import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Status } from '../model/statuses.model';
import { Comment } from '../model/comments.model';
import { User } from '../model/user.model';
import { Headers, Http, Response } from '@angular/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  status: Status[];
  constructor(private http: HttpClient) { }
  statusUrl = 'http://localhost:3000/statuses';
  commentsUrl = 'http://localhost:3000/comment';
  usersUrl = 'http://localhost:3000/users';

  private extractData(res: Response) {
    // tslint:disable-next-line:prefer-const
    let body = res;
    return body || {};
  }

 // get all users
  getUsers(): Observable<any> {
    return this.http.get(this.usersUrl).pipe(
      map(this.extractData),
      catchError(this.handleError));
    }

  // get users by ID
  getUserById(id: number) {
    return this.http.get<User>(this.usersUrl + '/' + id);
  }

  // get all statuses
  getStatuses(): Observable<any> {
    return this.http.get(this.statusUrl).pipe(
      map(this.extractData),
      catchError(this.handleError));
    }

  // add comments
  addComments(comments: Comment) {
    comments.localTime = new Date();
    return this.http.post(this.commentsUrl, comments);
  }

  // get comments
  getComments(id: number): Observable<any> {
    return this.http.get(this.commentsUrl).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  // upadet user status
  updateStatus(status: Status) {
  return this.http.put(this.statusUrl + '/' + status.id, status);
  }

  // add user status
  addStatus(status: Status) {
    return this.http.put(this.statusUrl, status);
   }
   // Errors Handler
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

}
