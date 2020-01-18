import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';
import { User } from 'src/models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  constructor(private service: ApiService) { }

  users: User[];

  users$: Observable<User[]>;

  ngOnInit() {
    // this.users$ = this.service.list();
    this.users$ = this.service.getAllAlunos();
  }
}
