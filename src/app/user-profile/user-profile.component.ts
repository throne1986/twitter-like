import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../service/user.service';
import { Status } from '../model/statuses.model';
import { Comment } from '../model/comments.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
 status: Status[];
 comment: Comment[];
 numberOflikes = 121;
 numberOffollowing = 723;
 numberOffollowers = 4433;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private userService: UserService) { }

  addForm: FormGroup;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      city: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.userService.getStatuses()
      .subscribe( data => {
        this.status = data;
        console.log(data);
        console.log(this.status);
      });

  }

  addComments() {
    this.userService.addComments(this.addForm.value)
    .subscribe(data => {
      this.comment.push(this.addForm.value);
    });
  }
  followButtonClick(statusId) {
    const statusToUpdate = this.status.filter(status => status.statusId === statusId)[0];
    statusToUpdate.followers++;
    this.persistStatus(statusToUpdate);
  }
  persistStatus(status) {
    this.userService.addStatus(status);
    console.log(status);
  }
}
