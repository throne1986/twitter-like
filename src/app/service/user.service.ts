import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Status } from '../model/statuses.model';
import { Comment } from '../model/comments.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {
   status: Status[];
   numberOflikes = 0;
  constructor(private http: HttpClient) { }
  statusUrl = 'http://localhost:3000/statuses';
  commentsUrl = 'http://localhost:3000/comment';

  getStatuses() {
    return this.http.get<Status[]>(this.statusUrl);
  }
  addStatus(status: Status) {
   return this.http.patch(this.statusUrl, status);
  }
  addComments(comment: Comment) {
    return this.http.post(this.commentsUrl, comment);
  }
  likeButtonClick() {
    this.numberOflikes++;
  }
  dislikeButtonClick() {
    this.numberOflikes--;
  }
}
