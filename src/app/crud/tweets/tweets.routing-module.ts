import { NgModule             } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TweetListComponent   } from './tweet-list/tweet-list.component';
import { TweetDetailComponent } from './tweet-detail/tweet-detail.component';

const tweetRoutes: Routes = [
  {
    path: 'tweets',
    component: TweetListComponent
  },
  {
    path: 'tweet-detail/:id',
    component: TweetDetailComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(
      tweetRoutes
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  declarations: []
})

export class TweetsRoutingModule { }
