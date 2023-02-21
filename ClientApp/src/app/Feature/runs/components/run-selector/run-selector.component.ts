import {Component, EventEmitter, Input, NgZone, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {IRun} from "../../models/iRun";
import {RunService} from "../../../../Root/services/run.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-run-selector',
  templateUrl: './run-selector.component.html',
  styleUrls: ['./run-selector.component.css']
})
export class RunSelectorComponent implements OnInit, OnChanges{

  runs$: Observable<IRun[]> = new Observable<IRun[]>(); // this is the observable that will be used to populate the run selector

  @Output() selectedRunChange: EventEmitter<IRun> = new EventEmitter<IRun>();
  @Output() addRunClick: EventEmitter<void> = new EventEmitter<void>();
  selectedRun: IRun = {} as IRun;
  constructor(private runService: RunService) { }

  ngOnInit() {
    this.runService.getAll().then(
      () => {
        this.runs$ = this.runService.runs$;
        this.runs$.subscribe((runs: IRun[]) => {
          if(runs.length > 0) {
            this.selectedRun = runs[0];
            this.selectedRunChange.emit(this.selectedRun);
          }
        })
      }
    )
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.selectedRun) {
      this.selectedRun = changes.selectedRun.currentValue;
      this.selectedRunChange.emit(this.selectedRun);
    }
  }


  onRunSelected(selectedRun: IRun) {
    this.selectedRunChange.emit(selectedRun);
  }

}
