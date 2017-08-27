import { NgModule                         } from '@angular/core';
import { CommonModule                     } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule              } from './users.routing-module';
import { UsersListComponent              } from './users-list/users-list.component';
import { UserDetailComponent              } from './user-detail/user-detail.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule
  ],
  exports: [
    UsersListComponent,
    UserDetailComponent
  ],
  providers: [],
  declarations: [
    UsersListComponent,
    UserDetailComponent
  ]
})

export class UsersModule { }
