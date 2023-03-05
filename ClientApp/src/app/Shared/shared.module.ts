import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterModule, RouterOutlet} from "@angular/router";
import {ConfirmModalComponent} from "./components/modals/confirmModal/confirm-modal.component";
import {HttpClientModule} from "@angular/common/http";
import {ShiftsFormComponent} from "./components/forms/shifts-create-form/shifts-form.component";
import {TimeFormatForDateTimePipe, TimeFormatForTimeSpanPipe, TimeFormatForUiPipe} from "./pipes/time-format.pipe";
import {DayOfWeekConversionPipe, StrToDayOfWeekConversionPipe} from './pipes/day-of-week-conversion.pipe';
import { ShopSelectionModealComponent } from './components/modals/shop-selection-modeal/shop-selection-modeal.component';
import {CollapseModule} from "ngx-bootstrap/collapse";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthValidators} from "./Validators/auth/auth-validators";

@NgModule({
  declarations: [
    ConfirmModalComponent,
    TimeFormatForUiPipe,
    TimeFormatForDateTimePipe,
    TimeFormatForTimeSpanPipe,
    ShiftsFormComponent,
    DayOfWeekConversionPipe,
    StrToDayOfWeekConversionPipe,
    ShopSelectionModealComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    HttpClientModule,
    RouterModule,
    CollapseModule.forRoot(),
    BrowserAnimationsModule,

  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    ConfirmModalComponent,
    RouterLink,
    HttpClientModule,
    RouterModule,
    TimeFormatForUiPipe,
    ShiftsFormComponent,
    DayOfWeekConversionPipe,
    StrToDayOfWeekConversionPipe,
    CollapseModule,
    BrowserAnimationsModule,
  ]
})
export class SharedModule { }
