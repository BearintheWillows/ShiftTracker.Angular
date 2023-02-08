import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterModule, RouterOutlet} from "@angular/router";
import {ConfirmModalComponent} from "./components/modals/confirmModal/confirm-modal.component";
import {HttpClientModule} from "@angular/common/http";
import { TimeFormatForUiPipe} from './pipes/time-format-for-ui.pipe';
import { TimeFormatForDateTimePipe } from './pipes/time-format-for-date-time.pipe';
import { TimeFormatForTimeSpanPipe } from './pipes/time-format-for-time-span.pipe';

@NgModule({
  declarations: [
    ConfirmModalComponent,
    TimeFormatForUiPipe,
    TimeFormatForDateTimePipe,
    TimeFormatForTimeSpanPipe,

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
  ]
})
export class SharedModule { }
