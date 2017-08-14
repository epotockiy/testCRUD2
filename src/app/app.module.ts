import { BrowserModule } from '@angular/platform-browser';
import { NgModule      } from '@angular/core';
import { HttpModule    } from '@angular/http';

import { AppComponent  } from './app.component';
import { CrudModule    } from './crud/crud.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    CrudModule
  ],
  providers: [],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
