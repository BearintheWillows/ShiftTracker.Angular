import {Component, OnInit} from '@angular/core';
import {IShift} from "../../interfaces/iShift";
import {ShiftService} from "../../services/shiftService/shift.service";
import {Router} from "@angular/router";
import {ConfirmModalComponent} from "../Helpers/confirm-modal/confirm-modal.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-shifts-list-table',
  templateUrl: './shifts-list-table.component.html',
  styleUrls: ['./shifts-list-table.component.scss']
})
export class ShiftsListTableComponent implements OnInit {

  public shifts: IShift[] = []
  private shiftService: ShiftService;
  modalRef?: BsModalRef;

  selectedEditShift?: IShift;
  selectedFunction?: string;

  constructor(shiftService: ShiftService,
              private router: Router,
              private modalService: BsModalService) {

    this.shiftService = shiftService;
  }


  ngOnInit(): void {
    this.populateShifts();

  }

  populateShifts(): void {
    this.shiftService.getShifts(false, false, false).subscribe((shifts: IShift[]) => {
      this.shifts = shifts;
      console.log(this.shifts)
    });
  }

  onSelectFunction(shift: IShift, func: string): void {
    this.selectedEditShift = shift;
    this.selectedFunction = func.toLowerCase();

    switch (func.toLowerCase()) {
      case "edit":
        break;
      case "cancel":
        this.selectedEditShift = undefined;
        break;
      case "confirm":
        this.selectedEditShift = undefined;
        this.shiftService.updateShift(shift).subscribe((shift: IShift) => {
          this.populateShifts();
        });
    }
  }

  editShift(shift: IShift): void {

  }

  deleteShift(shift: IShift): void {
    this.shiftService.postDeleteShift(shift.id).subscribe((shift: IShift) => {
      this.populateShifts();
    });
  }

  onDeleteConfirm(shift: IShift): void {

    let newDate = new Date(shift.date);
    this.modalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        title  : 'Confirm Delete Shift',
        message: `Are you sure you want to update the shift for ${newDate.toLocaleDateString('en-EN', {
          day: 'numeric', month: 'long', year: 'numeric'
        })}`,
      }
    });
    this.modalRef.content.onClose.subscribe((result: boolean) => {
      if(result) {
        this.deleteShift(shift);
      } else {
        this.modalService.hide(1);
      }
    });
  }

  goToDetail(shift: IShift): void {
    this.router.navigate([`/shifts/${shift.id}/detail`]);
  }
}

