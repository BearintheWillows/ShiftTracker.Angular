import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { ShiftEditReactiveComponent } from './shifts/shift-edit-reactive/shift-edit-reactive.component';
@NgModule({
  declarations: [
    AppComponent,
    ShiftsComponent,
    NavComponent,
    RunsComponent,
    ShopsComponent,
    ShiftEditComponent,
    ShiftTableRowComponent,
    ShiftEditReactiveComponent,

  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
