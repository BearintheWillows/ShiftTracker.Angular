import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ShiftsComponent } from './shifts/shifts.component';
import {NavComponent} from "./nav/nav.component";
import { AppRoutingModule } from './app-routing.module';
import { RunsComponent } from './runs/runs.component';
import { ShopsComponent } from './shops/shops.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShiftEditComponent } from './shifts/shift-edit/shift-edit.component';
import { ShiftTableRowComponent } from './shifts/shift-table-row/shift-table-row.component';
import {DatePipe} from "@angular/common";
@NgModule({
  declarations: [
    AppComponent,
    ShiftsComponent,
    NavComponent,
    RunsComponent,
    ShopsComponent,
    ShiftEditComponent,
    ShiftTableRowComponent,

  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
