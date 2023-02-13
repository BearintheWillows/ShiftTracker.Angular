import {Component, Input, NgZone, OnInit} from '@angular/core';
import {IRun} from "../../models/iRun";
import {RunService} from "../../../../Root/services/run.service";

@Component({
  selector: 'app-runs-home-page',
  templateUrl: './runs-home-page.component.html',
  styleUrls: ['./runs-home-page.component.css']
})
export class RunsHomePageComponent implements OnInit{

  runs: IRun[] = [];
  selectedRun: IRun = {} as IRun



  constructor(private runService: RunService,
              private ngZone: NgZone) { }

  onSelectedRun(run: IRun) {
    console.log(run)
    let foundRun = this.runs.find(r => r.number === run.number);
    if (foundRun) {
      this.selectedRun = foundRun;
      console.log(this.selectedRun);
    }

  }

  async ngOnInit(){
    await this.ngZone.run(async () => {
      this.runs = await this.getAllRuns();
    })

  }

  async getAllRuns(): Promise<IRun[]> {
    return new Promise(async (resolve) => {
      (await this.runService.getAll()).subscribe((runs: IRun[]) => {
        resolve(runs);
      });
    })};
}
