import { NgModule                         } from '@angular/core';
import { CommonModule                     } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommentComponent                 } from './comment/comment.component';
import { TweetComponent                   } from './tweet.component';
import { AddCommentFormComponent          } from './add-comment-form/add-comment-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TweetComponent,
    CommentComponent,
    AddCommentFormComponent
  ],
  providers: [],
  declarations: [
    TweetComponent,
    CommentComponent,
    AddCommentFormComponent
  ]
})

export class TweetModule { }
