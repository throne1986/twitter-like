import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Status } from '../model/statuses.model';
import { Comment } from '../model/comments.model';
import { User } from '../model/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  status: Status[];
  constructor(private http: HttpClient) { }
  statusUrl = 'http://localhost:3000/statuses';
  commentsUrl = 'http://localhost:3000/comment';
  usersUrl = 'http://localhost:3000/users';

  getUsers() {
    return this.http.get<User[]>(this.usersUrl);
  }
  getUserById(id: number) {
    return this.http.get<User>(this.usersUrl + '/' + id);
  }

  getStatuses() {
    return this.http.get<Status[]>(this.statusUrl);
  }
  addComments(comments: Comment) {
    return this.http.post(this.commentsUrl, comments);
  }
  getComments(id: number) {
    return this.http.get<Comment[]>(this.commentsUrl);
  }
  updateStatus(status: Status) {
  return this.http.put(this.statusUrl + '/' + status.id, status);
  }
  addStatus(status: Status) {
    return this.http.put(this.statusUrl, status);
   }

}
