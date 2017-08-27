import { NgModule                         } from '@angular/core';
import { CommonModule                     } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';

import { CommentComponent                 } from './tweet-detail/comment/comment.component';
import { TweetsComponent                  } from './tweets.component';
import { AddCommentFormComponent          } from './tweet-detail/add-comment-form/add-comment-form.component';
import { TweetsRoutingModule              } from './tweets.routing-module';
import { TweetListComponent               } from './tweet-list/tweet-list.component';
import { TweetDetailComponent             } from './tweet-detail/tweet-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    TweetsRoutingModule
  ],
  exports: [
    TweetsComponent,
    CommentComponent,
    AddCommentFormComponent,
    TweetListComponent,
    TweetDetailComponent
  ],
  providers: [],
  declarations: [
    TweetsComponent,
    CommentComponent,
    AddCommentFormComponent,
    TweetListComponent,
    TweetDetailComponent
  ]
})

export class TweetsModule { }
