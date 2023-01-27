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

  buttonGroup(): HTMLDivElement {
    const div = document.createElement('div');
    const button = document.createElement('button');
    div.classList.add('cBtnGroup');

    let buttonEditIcon = button.cloneNode(false) as HTMLButtonElement;
    buttonEditIcon.classList.add('cBtn', 'cBtn-Edit');
    buttonEditIcon.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';

    let buttonDelIcon = button.cloneNode(false) as HTMLButtonElement;
    buttonDelIcon.classList.add('cBtn', 'cBtn-Del');
    buttonDelIcon.textContent = '<i class="fa-regular fa-square-minus"></i>';

    div.appendChild(buttonEditIcon);
    div.appendChild(buttonDelIcon);

    return div;
}
}
