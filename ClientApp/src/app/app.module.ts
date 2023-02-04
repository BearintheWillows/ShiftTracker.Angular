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
import {DatePipe} from "@angular/common";
import {ShiftEditFormComponent} from './shifts/shift-edit-form/shift-edit-form.component';
import { ConfirmModalComponent } from './Helpers/confirm-modal/confirm-modal.component';
import {ModalModule} from "ngx-bootstrap/modal";
import { ShiftDetailComponent } from './shifts/shift-detail/shift-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ShiftsComponent,
    NavComponent,
    RunsComponent,
    ShopsComponent,
    ShiftEditFormComponent,
    ConfirmModalComponent,
    ShiftDetailComponent,


  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
