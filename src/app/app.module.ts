import { BrowserModule } from '@angular/platform-browser';
import { NgModule      } from '@angular/core';
import { HttpModule    } from '@angular/http';

import { AppComponent  } from './app.component';
import { CrudModule    } from './crud/crud.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    CrudModule
  ],
  providers: [],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
