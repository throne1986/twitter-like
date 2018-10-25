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
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private userService: UserService) { }

  addForm: FormGroup;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  addStatus() {
    this.userService.addStatus()
    .subscribe(data => {
      this.comment.push(this.addForm.value);
    });
  }

  addComments() {
    this.userService.addComments(this.addForm.value)
    .subscribe(data => {
      this.comment.push(this.addForm.value);
    });
  }
}
