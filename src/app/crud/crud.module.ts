import { NgModule         } from '@angular/core';

import { AddFormComponent } from './add-form/add-form.component';
import { CrudService      } from './services/crud.service';
import { TweetModule      } from './tweet/tweet.module';
import { CrudComponent    } from './crud.component';

@NgModule({
  imports: [
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
