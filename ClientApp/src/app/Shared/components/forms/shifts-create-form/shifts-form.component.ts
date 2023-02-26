
import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe, Location} from "@angular/common";
import {ShiftService} from "../../../../Root/services/shift.service";
import { RunService } from 'src/app/Root/services/run.service';
import {DateValidators} from "../../../Validators/Date/date-validators";
import {TimeValidators} from "../../../Validators/Time/time-validators";
import {ConfirmModalComponent} from "../../modals/confirmModal/confirm-modal.component";
import {IShift} from "../../../../Feature/shifts/models/iShift";
import {IRun} from "../../../../Feature/runs/models/iRun";
import {FormType} from "../../../enums/form-type";
import {
  TimeFormatForDateTimePipe,
  TimeFormatForTimeSpanPipe,
  TimeFormatForUiPipe
} from "../../../pipes/time-format.pipe";
import {Observable} from "rxjs";

@Component({
  selector: 'app-shifts-form',
  templateUrl: 'shifts-form.component.html',
  styleUrls: ['shifts-form.component.scss'],
  providers: [DatePipe]
})
export class ShiftsFormComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() shift: IShift = {} as IShift;
  @Input() formType: FormType = null as unknown as FormType;
  runs$: Observable<IRun[]> = new Observable<IRun[]>(); // this is the observable that will be used to populate the run selector
  runs: IRun[] = [];
  @Output() goBack = new EventEmitter();


  modalRef?: BsModalRef;

  shiftForm: FormGroup = this.fb.group({
    date     : ['', {
      validators     : [
        Validators.required,
        DateValidators.IsDateInFuture()],
      asyncValidators: [DateValidators.IsDateAlreadyUsed(this.shiftService)],
    }],
    run: [, {
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
      breakDuration: ['', {
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
              private fb: FormBuilder,
              private modalService: BsModalService,
              private router: Router,
              private location: Location,
              private datePipe: DatePipe
  ){}


  ngOnInit(): void {

    this.runService.getAllRuns().then(() => {
      this.runs$ = this.runService.allRuns$;
      this.runs$.subscribe(runs => {
        this.runs = runs;
      });

    if(this.formType === FormType.Create) {
      this.shiftForm.get('date')?.setValue(new Date().toISOString().substring(0, 10));

      console.log(this.shiftForm.get('runNumber')?.value);
    } else if(this.formType === FormType.Edit) {
      this.shiftForm.patchValue({
        date     : this.datePipe.transform(this.shift.date, 'yyyy-MM-dd'),
        run      : this.shift.run,
        timeData: {
          startTime    : TimeFormatForUiPipe.prototype.transform(this.shift.startTime),
          endTime      : TimeFormatForUiPipe.prototype.transform(this.shift.endTime),
          shiftDuration: TimeFormatForUiPipe.prototype.transform(this.shift.shiftDuration),
          driveTime    : TimeFormatForUiPipe.prototype.transform(this.shift.driveTime),
          workTime     : TimeFormatForUiPipe.prototype.transform(this.shift.workTime),
          otherWorkTime: TimeFormatForUiPipe.prototype.transform(this.shift.otherWorkTime),
          breakDuration: TimeFormatForUiPipe.prototype.transform(this.shift.breakDuration),
        }
      })
        this.shiftForm.get('date')?.removeAsyncValidators(DateValidators.IsDateAlreadyUsed(this.shiftService));
        this.shiftForm.get('date')?.disable();
  }
    });
    // subscribe to the valueChanges of the mySelect FormControl
    this.shiftForm.get('run')?.valueChanges.subscribe((value) => {
      console.log(value); // output the selected value to the console
    });
  }


  ngAfterViewInit(): void {
  }
  //Works when runs is retrieved from parent component
  ngOnChanges(): void {
    }

  onSubmitPress() {
    let newDate = new Date(this.date?.value);
    if (this.formType === FormType.Create) {
    this.modalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        title: 'Create New Shift',
        message: `Are you sure you want to create a new shift for ${newDate.toLocaleDateString('en-EN', {day: 'numeric', month: 'long', year: 'numeric'})}`,
      }
    });

  } else if (this.formType === FormType.Edit) {
      this.modalRef = this.modalService.show(ConfirmModalComponent, {
        initialState: {
          title: 'Edit Shift',
          message: `Are you sure you want to edit the shift for ${newDate.toLocaleDateString('en-EN', {
            day: 'numeric', month: 'long', year: 'numeric'
          })}`,
        }
      });
    }

    this.modalRef?.content.onClose.subscribe((result: boolean) => {
      if (result) {
        this.onSubmit();

      } else {
        this.modalService.hide(1);
      }
    });
}

  onSubmit() {

    this.shift.date = this.date?.value;
    this.shift.startTime = TimeFormatForDateTimePipe.prototype.transform(this.startTime?.value);
    this.shift.endTime = TimeFormatForDateTimePipe.prototype.transform(this.endTime?.value);
    this.shift.driveTime = TimeFormatForTimeSpanPipe.prototype.transform(this.driveTime?.value);
    this.shift.workTime = TimeFormatForTimeSpanPipe.prototype.transform(this.workTime?.value);
    this.shift.otherWorkTime = TimeFormatForTimeSpanPipe.prototype.transform(this.otherWorkTime?.value);
    this.shift.shiftDuration = this.shiftDuration?.value;
    this.shift.runId = this.run?.value.id;
    console.log(this.run?.value.id);
    this.shift.breakDuration = TimeFormatForTimeSpanPipe.prototype.transform(this.breakDuration?.value);
    console.log(this.shift);
    if(this.formType === FormType.Create){
      this.shiftService.postShift(this.shift).subscribe(() => {
        console.log("Added Successfully")
      });
    } else if (this.formType === FormType.Edit) {
      console.log(this.shift);
      this.shiftService.updateShift(this.shift).subscribe(() => {
        console.log("Edited Successfully")
      });
    }
      this.shiftService.getAllShifts().then(
        () =>  this.router.navigate(['/shifts'])
  );

  }

  get date() {
    return this.shiftForm.get('date');
  }

  get run() {
    return this.shiftForm.get('run');
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

  get breakDuration() {
    return this.shiftForm.get('timeData.breakDuration');
  }




}
