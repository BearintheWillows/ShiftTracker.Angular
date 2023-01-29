import {Component, OnInit} from '@angular/core';
import {IShift} from "../../../interfaces/iShift";
import {ShiftService} from "../../../services/shiftService/shift.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-shift-edit',
  templateUrl: './shift-edit.component.html',
  styleUrls: ['./shift-edit.component.scss']
})
export class ShiftEditComponent implements OnInit {
  public shift?: IShift;

  constructor(private shiftService: ShiftService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.shiftService.getShiftById(params['id']).subscribe((shift: IShift) => {
        this.shift = shift;
      });
    });
  }
}
