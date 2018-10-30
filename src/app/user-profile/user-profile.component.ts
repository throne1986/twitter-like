import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Status } from '../model/statuses.model';
import { Comment } from '../model/comments.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { User } from '../model/user.model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  users: User[];
  status: Status[];
  comments: Comment[];
  constructor(private formBuilder: FormBuilder, private activeRouter: ActivatedRoute, private userService: UserService) {
  }

  addForm: FormGroup;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      localTime: [],
      description: ['', Validators.required],
    });
// get all statuses
    this.userService.getStatuses()
    .subscribe(data => {
      this.status = data;
    });
// get all users
    this.userService.getUsers()
      .subscribe( data => {
        this.users = data;
      });
// get all comments
    this.activeRouter.params.subscribe((params) => {
        const id = params['id'];
        this.userService.getComments(id)
        .pipe(
          map(data => data.sort((a, b) => new Date(b.localTime).getTime() - new Date(a.localTime).getTime()))
        )
        .subscribe(data => this.comments = data);
     });
  }

// add comments to server
  addComments(task_id) {
    const formData = this.addForm.value;
    formData.task_id = task_id;
    this.userService.addComments(formData)
    .subscribe(data => {
      this.comments.unshift(this.addForm.value);
      this.addForm.reset();
    });
  // grab localtime
    const date = new Date();
    const d = date.getUTCDate();
    const day = (d < 10) ? '0' + d : d;
    const m = date.getUTCMonth() + 1;
    const month = (m < 10) ? '0' + m : m;
    const year = date.getUTCFullYear();
    const h = date.getUTCHours();
    const hour = (h < 10) ? '0' + h : h;
    const mi = date.getUTCMinutes();
    const minute = (mi < 10) ? '0' + mi : mi;
    const sc = date.getUTCSeconds();
    const second = (sc < 10) ? '0' + sc : sc;
    const loctime = `${year}-${month}-${day}T${hour}`;

    this.addForm.get('localTime').setValue(new Date());

  }

// creates likes counter for statuses
  likesButtonClick(statusId) {
    const statusToUpdate = this.status.filter(status => status.id === statusId)[0];
    statusToUpdate.likes++;
    this.persistStatus(statusToUpdate);
  }

  // create follow counter for statuses
  followButtonClick(statusId) {
    const statusToUpdate = this.status.filter(status => status.id === statusId)[0];
    statusToUpdate.followers++;
    this.persistStatus(statusToUpdate);
  }

//  updates statuses
  persistStatus(status) {
    this.userService.updateStatus(status)
      .subscribe(data => {
        this.status = [status];
      });
  }


}
