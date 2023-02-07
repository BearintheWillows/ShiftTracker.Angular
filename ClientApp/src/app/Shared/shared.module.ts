import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterModule, RouterOutlet} from "@angular/router";
import {ConfirmModalComponent} from "./components/modals/confirmModal/confirm-modal.component";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    ConfirmModalComponent,

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
    RouterModule
  ]
})
export class SharedModule { }
