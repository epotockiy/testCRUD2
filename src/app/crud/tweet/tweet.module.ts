import { NgModule         } from '@angular/core';

import { CommentComponent } from './comment/comment.component';
import { TweetComponent   } from './tweet.component';

@NgModule({
  imports: [],
  exports: [
    TweetComponent,
    CommentComponent
  ],
  providers: [],
  declarations: [
    TweetComponent,
    CommentComponent
  ]
})

export class TweetModule { }
