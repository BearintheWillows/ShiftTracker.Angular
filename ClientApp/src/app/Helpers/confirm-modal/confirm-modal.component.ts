import {Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {

  @Input() runNumber: number = 0;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public bsModalRef: BsModalRef) {
  }


  confirm(): void {
    this.onClose.emit(true);
    this.bsModalRef?.hide();
  }

  decline(): void {
    this.onClose.emit(false);
    this.bsModalRef?.hide();
  }
}
