import { NgModule                         } from '@angular/core';
import { CommonModule                     } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddTweetFormComponent            } from './add-tweet-form/add-tweet-form.component';
import { CrudService                      } from './services/crud.service';
import { TweetModule                      } from './tweet/tweet.module';
import { CrudComponent                    } from './crud.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TweetModule
  ],
  exports: [
    AddTweetFormComponent,
    CrudComponent
  ],
  providers: [
    CrudService
  ],
  declarations: [
    AddTweetFormComponent,
    CrudComponent
  ]
})

export class CrudModule { }
