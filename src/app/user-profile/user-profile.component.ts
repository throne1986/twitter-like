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

    this.userService.getStatuses()
    .subscribe(data => {
      this.status = data;
      console.log(data);
    });

    this.userService.getUsers()
      .subscribe( data => {
        this.users = data;
        console.log(data);
      });
      this.activeRouter.params.subscribe((params) => {
        // tslint:disable-next-line:prefer-const
        let id = params['id'];
        this.userService.getComments(id)
        .pipe(
          map(data => data.sort((a, b) => new Date(b.localTime).getTime() - new Date(a.localTime).getTime()))
        )
        .subscribe(data => this.comments = data);
        });

  }

  addComments(task_id) {
    const formData = this.addForm.value;
    formData.task_id = task_id;
    this.userService.addComments(formData)
    .subscribe(data => {
      this.comments.push(this.addForm.value);
    });
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
    const loctime = '${year}-${month}-${day}T${hour}:${minute}:${second}';

    this. addForm.get('localTime').setValue(loctime);

  }


  likesButtonClick(statusId) {
    const statusToUpdate = this.status.filter(status => status.id === statusId)[0];
    statusToUpdate.likes++;
    this.persistStatus(statusToUpdate);
  }

  followButtonClick(statusId) {
    const statusToUpdate = this.status.filter(status => status.id === statusId)[0];
    statusToUpdate.followers++;
    statusToUpdate.following++;
    this.persistStatus(statusToUpdate);
  }

  persistStatus(status) {
    this.userService.updateStatus(status)
      .subscribe(data => {
        this.status = [status];
      });
  }


}
