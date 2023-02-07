import {Component, OnInit, Output} from '@angular/core';
import {ShiftService} from "../../../../Root/services/shift.service";
import {IShift} from "../../models/iShift";

@Component({
  selector: 'app-shifts-home-page',
  templateUrl: './shifts-home-page.component.html',
  styleUrls: ['./shifts-home-page.component.scss']
})


export class ShiftsHomePageComponent implements OnInit{

  shifts: IShift[] = []

  constructor(
    private _shiftService: ShiftService
    ) {
  }

  ngOnInit() {
    this.populateShifts();
    console.log(this.shifts)
  }

  populateShifts(): void {
    this._shiftService.getShifts().subscribe((shifts: IShift[]) => {
      this.shifts = shifts;
      console.log(this.shifts)
    });
  }


}
