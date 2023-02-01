import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {IRun} from "../../../interfaces/iRun";
import {ShiftService} from "../../../services/shiftService/shift.service";
import {ActivatedRoute} from "@angular/router";
import {RunService} from "../../../services/runService/run.service";
import {DatePipe, formatDate} from "@angular/common";
import {IShift} from "../../../interfaces/iShift";
import {Validators} from "@angular/forms";
import {DateAlreadyUsedValidator, NotInFutureValidator} from "../../../Validators/Date/date-validators.directive";
import {ShiftTimesEqualShiftLength} from "../../../Validators/Time/time-validators.directive";

@Component({
  selector: 'app-shift-edit-form',
  templateUrl: './shift-edit-form.component.html',
  styleUrls: ['./shift-edit-form.component.scss']
})
export class ShiftEditFormComponent implements OnInit {

  public shift: IShift = {} as IShift;
  public runs: IRun[] = [];

  shiftForm = this.fb.group({
    date         : ['', [Validators.required,
      Validators.pattern('^[0-9]{4}-[0-9]{2}-[0-9]{2}$'),
      NotInFutureValidator()],
    ],
    runNumber    : [0],
    timeData     : this.fb.group({
      endTime      : [''],
      driveTime    : [''],
      startTime    : [''],
      workTime     : [''],
      otherWorkTime: [''],
    }, {validators: ShiftTimesEqualShiftLength()})
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

  get date() {
    return this.shiftForm.get('date');
  }

  get runNumber() {
    return this.shiftForm.get('runNumber');
  }

  get startTime() {
    return this.shiftForm.get('timeData.startTime');
  }

  get endTime() {
    return this.shiftForm.get('timeData.endTime');
  }

  get driveTime() {
    return this.shiftForm.get('timeData.driveTime');
  }

  get workTime() {
    return this.shiftForm.get('timeData.workTime');
  }

  get otherWorkTime() {
    return this.shiftForm.get('timeData.otherWorkTime');
  }

  get timeData() {
    return this.shiftForm.get('timeData');
  }
}
