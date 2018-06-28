import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MyFormComponent } from './forms/my-form/my-form.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CalendarModule } from 'primeng/calendar';
import { ConnectionIndexComponent } from './connection-index/connection-index.component';
import { TableModule } from 'primeng/table';
import { ConnectionListService } from './connection-list.service';

@NgModule({
  declarations: [
    AppComponent,
    MyFormComponent,
    ConnectionIndexComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    InputSwitchModule,
    CalendarModule,
    TableModule

  ],
  providers: [ConnectionListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
