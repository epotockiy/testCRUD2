import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CrudService } from '../../services/crud.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  usersList: User[];
  isDataLoaded = false;

  constructor(
    private _crudService: CrudService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this._crudService.getUsers()
      .subscribe(
        users => {
          this.usersList = users;
          this.isDataLoaded = true;
        },
        error => {
          console.log(error);
        }
      );
  }

  onDetailsClick(event, id: number) {
    event.preventDefault();
    this._router.navigate(['/users', id]);
  }
}
