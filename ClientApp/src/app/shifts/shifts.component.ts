import {Component, inject, OnInit} from '@angular/core';
import {IShift} from "../../interfaces/iShift";
import {ShiftService} from "../../services/shiftService/shift.service";
import { Router} from "@angular/router";

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss']
})
export class ShiftsComponent implements OnInit {

  public shifts: IShift[] = []
  private shiftService: ShiftService;

  selectedEditShift?: IShift;
  selectedFunction?: string;

  constructor(shiftService: ShiftService,
              private router: Router) {

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
    }

    goToDetail(shift: IShift): void {
      this.router.navigate([`/shifts/${shift.id}/detail`]);
    }
}





