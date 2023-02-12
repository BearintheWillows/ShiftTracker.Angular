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

  onSelect(run: IRun){
    console.log(run);
  }

  constructor(private runService: RunService,
              private ngZone: NgZone) { }

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
