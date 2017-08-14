import { NgModule                         } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddFormComponent                 } from './add-form/add-form.component';
import { CrudService                      } from './services/crud.service';
import { TweetModule                      } from './tweet/tweet.module';
import { CrudComponent                    } from './crud.component';
import { CommonModule                     } from '@angular/common';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TweetModule
  ],
  exports: [
    AddFormComponent,
    CrudComponent
  ],
  providers: [
    CrudService
  ],
  declarations: [
    AddFormComponent,
    CrudComponent
  ]
})

export class CrudModule { }
