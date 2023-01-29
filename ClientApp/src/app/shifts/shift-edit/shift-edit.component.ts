import {Component, OnInit} from '@angular/core';
import {IShift} from "../../../interfaces/iShift";
import {ShiftService} from "../../../services/shiftService/shift.service";
import {ActivatedRoute} from "@angular/router";
import {IRun} from "../../../interfaces/iRun";
import {RunService} from "../../../services/runService/run.service";
import {Observable} from "rxjs";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-shift-edit',
  templateUrl: './shift-edit.component.html',
  styleUrls: ['./shift-edit.component.scss']
})
export class ShiftEditComponent implements OnInit {
  public shift: IShift
  public runs: IRun[] = [];
  public submitted: boolean = false;
  constructor(private shiftService: ShiftService, private route: ActivatedRoute, private runService: RunService, private datePipe: DatePipe) {
    this.shift = {
      id: 0,
      runId: 0,
      startTime: new Date(),
      endTime: new Date(),
      driveTime: new Date(),
      breakDuration: new Date(),
      shiftDuration: new Date(),
      otherWorkTime: new Date(),
      workTime: new Date(),
      date: new Date(),
      run: {
        id: 0,
        number: 0,
        startTime: new Date(),
      }}


  }




  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getShiftById(params['id']);
    });
      this.getAllRuns();

  }



  getShiftById(id: number) {
    this.shiftService.getShiftById(id).subscribe((shift: IShift) => {
      this.shift = shift;
      console.log(this.shift)
    });
  }

  async getAllRuns() {
    (await this.runService.getAll()).subscribe((runs: IRun[]) => {
      this.runs = runs;
    });
  }


  onSubmit() { this.submitted = true}
}
