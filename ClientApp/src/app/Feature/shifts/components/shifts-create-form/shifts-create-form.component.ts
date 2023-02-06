
import {Component, OnInit, TemplateRef} from '@angular/core';
import {IShift} from "../../models/iShift";
import {IRun} from "../../../runs/models/iRun";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateValidators} from "../../../../Shared/Validators/Date/date-validators";
import {TimeValidators} from "../../../../Shared/Validators/Time/time-validators";
import {ActivatedRoute, Router} from "@angular/router";
import {RunService} from "../../../../services/runService/run.service";
import {DatePipe} from "@angular/common";
import {ShiftService} from "../../../../Root/services/shift.service";
import {ConfirmModalComponent} from "../../../../Shared/components/modals/confirmModal/confirm-modal.component";

@Component({
  selector: 'app-shifts-create-form',
  templateUrl: './shifts-create-form.component.html',
  styleUrls: ['./shifts-create-form.scss'],
})
export class ShiftsCreateFormComponent implements OnInit {

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

    this.shift.date = this.date?.value;
    this.shift.startTime = this.startTime?.value;
    this.shift.endTime = this.endTime?.value;
    this.shift.driveTime = this.driveTime?.value;
    this.shift.workTime = this.workTime?.value;
    this.shift.otherWorkTime = this.otherWorkTime?.value;
    this.shift.shiftDuration = this.shiftDuration?.value;
    this.shift.runId = this.runs.find(run => run.number == this.runNumber?.value)?.id ?? 0

    this.shiftService.postShift(this.shift).subscribe(() => {
      console.log("Added Successfully")
      this.router.navigate(['/shifts']);
    });

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
  // goBack(): void {
  //   this.location.back();
  // }



}
