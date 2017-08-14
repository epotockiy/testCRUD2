import { NgModule         } from '@angular/core';

import { CommentComponent } from './comment/comment.component';
import { TweetComponent   } from './tweet.component';
import { CommonModule     } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
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
