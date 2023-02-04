import {Component, OnInit} from '@angular/core';
import {ShiftService} from "../../../services/shiftService/shift.service";
import {ActivatedRoute} from "@angular/router";
import {IShift} from "../../../interfaces/iShift";

@Component({
  selector: 'app-shift-detail',
  templateUrl: './shift-detail.component.html',
  styleUrls: ['./shift-detail.component.scss']
})
export class ShiftDetailComponent implements OnInit{

    shift: IShift = {} as IShift;

    constructor(
      private shiftService: ShiftService,
      private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.getShiftById(params['id']);
      });
    }

    getShiftById(id: number): void {
      this.shiftService.getShiftById(id).subscribe(
        shift => this.shift = shift
      );
    }

}

