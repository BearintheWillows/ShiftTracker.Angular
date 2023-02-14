import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterModule, RouterOutlet} from "@angular/router";
import {ConfirmModalComponent} from "./components/modals/confirmModal/confirm-modal.component";
import {HttpClientModule} from "@angular/common/http";
import {ShiftsFormComponent} from "./components/forms/shifts-create-form/shifts-form.component";
import {TimeFormatForDateTimePipe, TimeFormatForTimeSpanPipe, TimeFormatForUiPipe} from "./pipes/time-format.pipe";
import {DayOfWeekConversionPipe, StrToDayOfWeekConversionPipe} from './pipes/day-of-week-conversion.pipe';

@NgModule({
  declarations: [
    ConfirmModalComponent,
    TimeFormatForUiPipe,
    TimeFormatForDateTimePipe,
    TimeFormatForTimeSpanPipe,
    ShiftsFormComponent,
    DayOfWeekConversionPipe,
    StrToDayOfWeekConversionPipe

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    HttpClientModule,
    RouterModule,
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
  ]
})
export class SharedModule { }
