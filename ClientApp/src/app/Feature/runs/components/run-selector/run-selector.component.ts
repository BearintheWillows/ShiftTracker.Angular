import {Component, EventEmitter, Input, NgZone, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {IRun} from "../../models/iRun";
import {RunService} from "../../../../Root/services/run.service";

@Component({
  selector: 'app-run-selector',
  templateUrl: './run-selector.component.html',
  styleUrls: ['./run-selector.component.css']
})
export class RunSelectorComponent implements OnChanges{

  @Input() runs: IRun[] = []

  @Output() selectedRunChange: EventEmitter<IRun> = new EventEmitter<IRun>();
  @Output() addRun: EventEmitter<void> = new EventEmitter<void>();
  selectedRun: IRun = {} as IRun;
  constructor() { }



  ngOnChanges(changes: SimpleChanges) {
    this.selectedRunChange.emit(this.runs[this.runs.length - 1])
  }


  onRunSelected(selectedRun: IRun) {
    this.selectedRunChange.emit(selectedRun);
  }

}
