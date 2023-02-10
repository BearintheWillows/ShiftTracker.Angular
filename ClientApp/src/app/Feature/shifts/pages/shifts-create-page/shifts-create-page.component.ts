import {Component, NgZone, OnInit} from '@angular/core';
import {FormType} from "../../../../Shared/enums/form-type";
import {IRun} from "../../../runs/models/iRun";
import {RunService} from "../../../../Root/services/run.service";

@Component({
  selector: 'app-shifts-create-page',
  templateUrl: 'shifts-create-page.component.html',
  styleUrls: ['shifts-create-page.component.scss']
})
export class ShiftsCreatePageComponent implements OnInit{

  formType: FormType = FormType.Create;
  constructor(private runService: RunService, private ngZone: NgZone
  ){

  }

  runs: IRun[] = [];
  async ngOnInit(){
    await this.ngZone.run(async () => {
      this.runs = await this.getAllRuns();
      console.log(this.runs);
    })

  }

  async getAllRuns(): Promise<IRun[]> {
    return new Promise(async (resolve) => {
      (await this.runService.getAll()).subscribe((runs: IRun[]) => {
        resolve(runs);
      });
    })};
}
