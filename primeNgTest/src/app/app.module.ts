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
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { InputTextModule } from 'primeng/inputtext';
import { ViewService } from './view.service';
import { ToolbarModule } from 'primeng/toolbar';
import { GrowlModule } from 'primeng/growl';
import { MessageService } from 'primeng/components/common/messageservice';
import { DialogModule } from 'primeng/dialog';
import { SaveViewDialogComponent } from './save-view-dialog/save-view-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MyFormComponent,
    ConnectionIndexComponent,
    SaveViewDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    InputSwitchModule,
    CalendarModule,
    TableModule,
    MultiSelectModule,
    CheckboxModule,
    OverlayPanelModule,
    ToggleButtonModule,
    TieredMenuModule,
    SplitButtonModule,
    InputTextModule,
    ToolbarModule,
    GrowlModule,
    DialogModule
  ],
  providers: [ConnectionListService, ViewService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
