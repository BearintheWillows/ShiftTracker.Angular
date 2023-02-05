import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConfirmModalComponent} from "./components/modals/confirmModal/confirm-modal.component";
import {ModalModule} from "ngx-bootstrap/modal";



@NgModule({
  declarations: [
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot(),

  ],
  exports: [
    ConfirmModalComponent
  ]
})
export class SharedModule { }
