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
  public shift$: Observable<IShift> | undefined;
  public shift = {} as IShift;
  public runs: IRun[] = [];
  public submitted: boolean = false;
  public selectedRun: IRun = {} as IRun;
  constructor(private shiftService: ShiftService, private route: ActivatedRoute, private runService: RunService, private datePipe: DatePipe) {


  }


//
//
  ngOnInit(): void {
    // this.route.params.subscribe(params => {
    //   this.getShiftById(params['id']);
    // });
    //   this.getAllRuns();

  }
//
//
//
  getShiftById(id: number) {
    this.shift$ = this.shiftService.getShiftById(id)
  }
//
  async getAllRuns() {
    (await this.runService.getAll()).subscribe((runs: IRun[]) => {
      this.runs = runs;
    });
  }
//
//
//   onSubmit() {
//     this.submitted = true;
//     this.shift$?.subscribe((shift: IShift) => {
//       console.log("submit" + shift);
//       shift.runId = this.selectedRun.id ?? shift.runId;
//         this.shiftService.updateShift(shift).subscribe(() => console.log("Shift updated"));
//     });
//   }
//
//   onSelectRun(run: IRun) {
//     this.selectedRun = run;
//   }
//
//   checkShift(shift: IShift){
//     console.log(shift);
//   }
 }
