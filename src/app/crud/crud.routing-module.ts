import { NgModule              } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';

import { AddTweetFormComponent } from './add-tweet-form/add-tweet-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const crudRoutes: Routes = [
  {
    path: 'add-tweet',
    component: AddTweetFormComponent
  },
  {
    path: '',
    redirectTo: 'tweets',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      crudRoutes
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  declarations: []
})

export class CrudRoutingModule { }
