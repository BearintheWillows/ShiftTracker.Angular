import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IShift} from "../../models/iShift";
import {Router} from "@angular/router";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ShiftService} from "../../../../Root/services/shift.service";
import { ConfirmModalComponent } from 'src/app/Shared/components/modals/confirmModal/confirm-modal.component';

@Component({
  selector: 'app-shifts-list-table',
  templateUrl: './shifts-list-table.component.html',
  styleUrls: ['./shifts-list-table.component.scss'],
  providers: [ShiftService]
})
export class ShiftsListTableComponent implements OnInit {

  @Input() shifts: IShift[] = []
  @Output() populateTable = new EventEmitter();
  modalRef?: BsModalRef;

  selectedEditShift?: IShift;
  selectedFunction?: string;

  constructor(private shiftService: ShiftService,
              private router: Router,
              private modalService: BsModalService) {

  }


  ngOnInit(): void {

  }

  editShift(shift: IShift): void {

  }

  deleteShift(shift: IShift): void {
    this.shiftService.postDeleteShift(shift.id).subscribe((shift: IShift) => {
    });
  }

  onDeleteConfirm(shift: IShift): void {

    let newDate = new Date(shift.date);
    this.modalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        title  : 'Confirm Delete Shift',
        message: `Are you sure you want to DELETE the shift for ${newDate.toLocaleDateString('en-EN', {
          day: 'numeric', month: 'long', year: 'numeric'
        })}`,
      }
    });
    this.modalRef.content.onClose.subscribe((result: boolean) => {
      if(result) {
        this.deleteShift(shift);
        this.populateTable.emit()
      } else {
        this.modalService.hide(1);
      }
    });
  }

  goToDetail(shift: IShift): void {
    this.router.navigate([`/shifts/${shift.id}/detail`]);
  }
}
