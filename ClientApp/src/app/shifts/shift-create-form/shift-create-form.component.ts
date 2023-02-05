import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {IRun} from "../../../interfaces/iRun";
import {ShiftService} from "../../../services/shiftService/shift.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RunService} from "../../../services/runService/run.service";
import {DatePipe, Location} from "@angular/common";
import {IShift} from "../../../interfaces/iShift";
import {Validators} from "@angular/forms";
import {
  DateValidators
} from "../../../Validators/Date/date-validators.directive";
import { TimeValidators } from "../../../Validators/Time/time-validators.directive";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ConfirmModalComponent} from "../../Helpers/confirm-modal/confirm-modal.component";

@Component({
  selector: 'app-shift-create-form',
  templateUrl: './shift-create-form.component.html',
  styleUrls: ['./shift-create-form.component.scss']
})
export class ShiftCreateFormComponent implements OnInit {

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
              private router: Router,
              private location: Location
  ){}

  ngOnInit(): void {
    this.getAllRuns();
  }



  async getAllRuns() {
    (await this.runService.getAll()).subscribe((runs: IRun[]) => {
      this.runs = runs;
    });
  }

  onSubmitPress() {
    let newDate = new Date(this.date?.value);
    this.modalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        title: 'Create New Shift',
        message: `Are you sure you want to create a new shift for ${newDate.toLocaleDateString('en-EN', {day: 'numeric', month: 'long', year: 'numeric'})}`,
      }
    });
    this.modalRef.content.onClose.subscribe((result: boolean) => {
      if (result === true) {
        this.onSubmit();
      } else {
        this.modalService.hide(1);
      }
    });
  }

  onSubmit() {

    // ":00 appended to each value to satisfy C# Timespan conversion criteria.
    this.shift.date = this.date?.value;
    this.shift.startTime = this.startTime?.value + ":00";
    this.shift.endTime = this.endTime?.value + ":00";
    this.shift.driveTime = this.driveTime?.value + ":00";
    this.shift.workTime = this.workTime?.value + ":00";
    this.shift.otherWorkTime = this.otherWorkTime?.value + ":00";
    this.shift.shiftDuration = this.shiftDuration?.value;
    this.shift.breakDuration = "00:00:00"

    this.runService.getRunIdFromRunNumber(this.runNumber?.value).subscribe(
      (runId: number) => {
        this.shift.runId = runId;
        this.shiftService.postShift(this.shift).subscribe(() => {
          console.log("Added Successfully")
          this.router.navigate(['/shifts']);
        });

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

  // go back to previous component
  goBack(): void {
    this.location.back();
  }



}
