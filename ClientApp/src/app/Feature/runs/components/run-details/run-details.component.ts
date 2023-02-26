import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {IRun} from "../../models/iRun";
import {Observable} from "rxjs";
import {RunService} from "../../../../Root/services/run.service";

@Component({
  selector: 'app-run-details',
  templateUrl: './run-details.component.html',
  styleUrls: ['./run-details.component.scss']
})
export class RunDetailsComponent implements OnInit{

  selectedRun$: Observable<IRun> = new Observable<IRun>();


  constructor(private runService: RunService) { }

  ngOnInit() {
    this.selectedRun$ = this.runService.selectedRun$;
  }



}
