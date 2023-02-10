import {Component, NgZone, OnInit} from '@angular/core';
import {RunService} from "../../../../Root/services/run.service";
import {IRun} from "../../../runs/models/iRun";
import {FormType} from "../../../../Shared/enums/form-type";
import {IShift} from "../../models/iShift";
import {ShiftService} from "../../../../Root/services/shift.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe, Location} from "@angular/common";
import {FormBuilder} from "@angular/forms";
import {BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-shifts-edit-page',
  templateUrl: './shifts-edit-page.component.html',
  styleUrls: ['./shifts-edit-page.component.css']
})
export class ShiftsEditPageComponent implements OnInit {

  shift: IShift = {} as IShift;
  runs: IRun[] = [];
  formType: FormType = FormType.Edit;
  private shiftId: number = 0
  constructor(private runService: RunService, private ngZone: NgZone, private shiftService: ShiftService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,) { }

  async ngOnInit() {

    this.route.params.subscribe(params => {
     this.shiftId = params['id'];

    });

    await this.ngZone.run(async () => {
      this.runs = await this.getAllRuns();
      this.shift = await this.getShiftById(this.shiftId);
      console.log(this.runs);
    })

  }

  async getAllRuns(): Promise<IRun[]> {
    return new Promise(async (resolve) => {
      (await this.runService.getAll()).subscribe((runs: IRun[]) => {
        resolve(runs);
      });
    })};

  async getShiftById(id: number): Promise<IShift> {
    return new Promise(async (resolve) => {
      (await this.shiftService.getShiftById(id)).subscribe((shift: IShift) => {
        resolve(shift);
      });
    })};

  goBack(): void {
    this.location.back();
  }

}
