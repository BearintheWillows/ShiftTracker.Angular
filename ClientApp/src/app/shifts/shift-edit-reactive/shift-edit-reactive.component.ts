import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {IRun} from "../../../interfaces/iRun";
import {ShiftService} from "../../../services/shiftService/shift.service";
import {ActivatedRoute} from "@angular/router";
import {RunService} from "../../../services/runService/run.service";
import {DatePipe, formatDate} from "@angular/common";
import {IShift} from "../../../interfaces/iShift";

@Component({
  selector: 'app-shift-edit-reactive',
  templateUrl: './shift-edit-reactive.component.html',
  styleUrls: ['./shift-edit-reactive.component.scss']
})
export class ShiftEditReactiveComponent implements OnInit {

  public shift: IShift = {} as IShift;
  public runs: IRun[] = [];
  shiftForm = this.fb.group({
    date         : [''],
    runNumber    : [0],
    timeData     : this.fb.group({
      endTime      : [''],
      driveTime    : [''],
      startTime    : [''],
      workTime     : [''],
      otherWorkTime: [''],
    }),
})


  constructor(private shiftService: ShiftService,
              private route: ActivatedRoute,
              private runService: RunService,
              private datePipe: DatePipe,
              private fb: FormBuilder){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getShiftById(params['id']);
    });

    this.getAllRuns();
  }


  getShiftById(id: number) {
    this.shiftService.getShiftById(id).subscribe((shift: IShift) => {
      this.shift = shift;
      this.shiftForm.setValue({
        date     : this.datePipe.transform(this.shift.date, 'yyyy-MM-dd'),
        runNumber: this.shift.run.number,
        timeData: {
          startTime    : this.shift.startTime.toString(),
          endTime      : this.shift.endTime.toString(),
          driveTime    : this.shift.driveTime.toString(),
          workTime     : this.shift.workTime.toString(),
          otherWorkTime: this.shift.otherWorkTime.toString(),
        }
    });
  });
  }

  async getAllRuns() {
    (await this.runService.getAll()).subscribe((runs: IRun[]) => {
      this.runs = runs;
    });
  }

  onSubmit() {
    console.warn(this.shiftForm.value);
  }
}
