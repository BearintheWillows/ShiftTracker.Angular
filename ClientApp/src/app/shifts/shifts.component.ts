import {Component, inject, OnInit} from '@angular/core';
import {IShift} from "../../interfaces/iShift";
import {ShiftService} from "../../services/shiftService/shift.service";

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss']
})
export class ShiftsComponent implements OnInit {

  public shifts: IShift[] = []
  private shiftService: ShiftService;

  constructor(shiftService: ShiftService) {

    this.shiftService = shiftService;
}

  ngOnInit(): void {
    this.populateShifts();
  }


  populateShifts(): void {
      this.shiftService.getShifts(true, true, false).subscribe((shifts: IShift[]) => {
      this.shifts = shifts;
    });
  }

}
