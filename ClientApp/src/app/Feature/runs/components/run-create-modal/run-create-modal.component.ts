import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfirmModalComponent} from "../../../../Shared/components/modals/confirmModal/confirm-modal.component";
import {Observable} from "rxjs";
import {IShop} from "../../../shops/Models/IShop";
import {BsModalRef} from "ngx-bootstrap/modal";
import {ShopService} from "../../../../Root/services/shop.service";
import {IRun} from "../../models/iRun";
import {RunService} from "../../../../Root/services/run.service";

@Component({
  selector: 'app-run-create-modal',
  templateUrl: './run-create-modal.component.html',
  styleUrls: ['./run-create-modal.component.css']
})
export class RunCreateModalComponent {

  @Input() title: string = '';
  @Input() message: string = '';

  run: IRun = {} as IRun;
  availableRunNumbers: number[] = [];
  modalRef?: BsModalRef;

  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public bsModalRef: BsModalRef,
    private _runService: RunService) {
  }

  ngOnInit() {
      this.getAvailableRunNumber();
  }


  confirm(): void {
    console.log(this.run);
    this._runService.createRun(this.run).subscribe(
      (data) => {
        this._runService.getAll().then(r => {
          this.onClose.emit(true);
          this.bsModalRef?.hide();
        })}
      );
      }


  decline(): void {
    this.onClose.emit(false);
    this.bsModalRef?.hide();
  }

  getAvailableRunNumber() {
    let runNumbers: number[] = [];
    this._runService.runs$.subscribe(
      (data) => {

        data.forEach((run: IRun) => {
          runNumbers.push(run.number);
        });
        for (let i = 1; i <= 120; i++) {
          if(!runNumbers.includes(i)) {
            this.availableRunNumbers.push(i);
          }
        }
      });
  }

}
