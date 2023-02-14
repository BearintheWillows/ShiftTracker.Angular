import {Component, Input, NgZone, OnInit} from '@angular/core';
import {IRun} from "../../models/iRun";
import {RunService} from "../../../../Root/services/run.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-runs-home-page',
  templateUrl: './runs-home-page.component.html',
  styleUrls: ['./runs-home-page.component.css']
})
export class RunsHomePageComponent implements OnInit{

  runs: IRun[] = [];
  selectedRun: IRun = {} as IRun;
  $selectedRun: Observable<IRun> = new Observable<IRun>();



  constructor(private runService: RunService,
              private ngZone: NgZone) { }

  onSelectedRun(run: IRun) {
    this.$selectedRun = this.runService.getByIdWithDailyRoutePlans(run.id).pipe() as Observable<IRun>;
    this.$selectedRun.subscribe((run: IRun) => {
      console.log(run);
    })

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
