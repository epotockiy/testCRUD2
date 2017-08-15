import { NgModule                         } from '@angular/core';
import { CommonModule                     } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CrudService                      } from './services/crud.service';
import { AddTweetFormComponent            } from './add-tweet-form/add-tweet-form.component';
import { TweetsModule                     } from './tweets/tweets.module';
import { PageNotFoundComponent            } from './page-not-found/page-not-found.component';
import { CrudComponent                    } from './crud.component';
import { CrudRoutingModule                } from './crud.routing-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TweetsModule,
    CrudRoutingModule
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
    CrudComponent,
    PageNotFoundComponent
  ]
})

export class CrudModule { }
