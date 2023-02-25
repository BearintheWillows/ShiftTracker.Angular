import {Component, NgZone, OnInit} from '@angular/core';
import {FormType} from "../../../../Shared/enums/form-type";
import {IRun} from "../../../runs/models/iRun";
import {RunService} from "../../../../Root/services/run.service";
import {Location} from "@angular/common";
import {Observable} from "rxjs";

@Component({
  selector: 'app-shifts-create-page',
  templateUrl: 'shifts-create-page.component.html',
  styleUrls: ['shifts-create-page.component.scss']
})
export class ShiftsCreatePageComponent implements OnInit{

  formType: FormType = FormType.Create;
  constructor(private runService: RunService, private ngZone: NgZone, private location: Location) { }


  runs$: Observable<IRun[]> = new Observable<IRun[]>(); // this is the observable that will be used to populate the run selector
  ngOnInit(){


  }

  async getAllRuns() {
    await this.runService.getAllRuns();
    this.runs$ = this.runService.allRuns$;
    };

  goBack(): void {
    this.location.back();
  }
}
