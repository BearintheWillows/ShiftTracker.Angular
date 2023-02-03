import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {IRun} from "../../../interfaces/iRun";
import {ShiftService} from "../../../services/shiftService/shift.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RunService} from "../../../services/runService/run.service";
import {DatePipe} from "@angular/common";
import {IShift} from "../../../interfaces/iShift";
import {Validators} from "@angular/forms";
import {
  DateValidators
} from "../../../Validators/Date/date-validators.directive";
import { TimeValidators } from "../../../Validators/Time/time-validators.directive";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ConfirmModalComponent} from "../../Helpers/confirm-modal/confirm-modal.component";

@Component({
  selector: 'app-shift-edit-form',
  templateUrl: './shift-edit-form.component.html',
  styleUrls: ['./shift-edit-form.component.scss']
})
export class ShiftEditFormComponent implements OnInit {

  public shift: IShift = {} as IShift;
  public runs: IRun[] = [];
  modalRef?: BsModalRef;

  shiftForm: FormGroup = this.fb.group({
    date     : ['', {
      validators     : [
        Validators.required,
        DateValidators.IsDateInFuture()],
      asyncValidators: [],
    }],
    runNumber: [0, {
      validators: [
        Validators.required],
    }],
      timeData : this.fb.group({
        startTime: ['', {
          validators: [
            Validators.required],
        }],
        endTime  : ['', {
          validators: [
            Validators.required],
        }],
        shiftDuration: [
          {value: '', disabled: true} , {
            validators: [],
          }],


        driveTime: ['', {
          validators: [
            Validators.required],
        }],
        workTime: ['', {
          validators: [
            Validators.required],
        }],
        otherWorkTime: ['', {
          validators: [
            Validators.required],
        }],
      },{
      validators: [
        TimeValidators.IsShiftStartBeforeShiftEnd(),
        TimeValidators.IsWorkTimeEqualToShiftLength()],
        asyncValidators: [],
        updateOn: 'blur'
        }),
  },{
    validators: [],
  });

  constructor(private shiftService: ShiftService,
              private route: ActivatedRoute,
              private runService: RunService,
              private datePipe: DatePipe,
              private fb: FormBuilder,
              private modalService: BsModalService,
              private router: Router
){}

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
        date     : this.datePipe.transform(shift.date, 'yyyy-MM-dd'),
        runNumber: shift.run.number,

        timeData: {
          startTime    : shift.startTime.toString(),
          endTime      : shift.endTime.toString(),
          shiftDuration: shift.shiftDuration.toString(),
          driveTime    : shift.driveTime.toString(),
          workTime     : shift.workTime.toString(),
          otherWorkTime: shift.otherWorkTime.toString(),
        }
    });
  });
  }

  async getAllRuns() {
    (await this.runService.getAll()).subscribe((runs: IRun[]) => {
      this.runs = runs;
    });
  }

  onSubmitPress() {
 this.modalRef = this.modalService.show(ConfirmModalComponent, {
   initialState: {
     runNumber: this.runNumber?.value,
   }
 });
  this.modalRef.content.onClose.subscribe((result: boolean) => {
    if (result === true) {
      console.log(result);
      this.onSubmit();
    } else {
      this.modalService.hide(1);
    }
  });
}

  onSubmit() {

    this.shift.date = this.date?.value;
    this.shift.startTime = this.startTime?.value;
    this.shift.endTime = this.endTime?.value;
    this.shift.driveTime = this.driveTime?.value;
    this.shift.workTime = this.workTime?.value;
    this.shift.otherWorkTime = this.otherWorkTime?.value;
    this.shift.shiftDuration = this.shiftDuration?.value;
    this.shift.runId = this.runs.find(run => run.number == this.runNumber?.value)?.id ?? 0

    console.log(this.shift);
    this.shiftService.updateShift(this.shift).subscribe(() => {
      this.router.navigate(['/shifts']);
    }
    );
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

  get shiftDuration() {
    return this.shiftForm.get('timeData.shiftDuration');
  }


}
