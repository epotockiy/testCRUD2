import { NgModule             } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersListComponent   } from './users-list/users-list.component';
import { UserDetailComponent   } from './user-detail/user-detail.component';

const usersRoutes: Routes = [
  {
    path: 'users',
    component: UsersListComponent
  },
  {
    path: 'users/:id',
    component: UserDetailComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(
      usersRoutes
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  declarations: []
})

export class UsersRoutingModule { }
