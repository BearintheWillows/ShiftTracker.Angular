import {Component, EventEmitter, Input, NgZone, OnInit, Output} from '@angular/core';
import {IRun} from "../../models/iRun";
import {RunService} from "../../../../Root/services/run.service";

@Component({
  selector: 'app-run-selector',
  templateUrl: './run-selector.component.html',
  styleUrls: ['./run-selector.component.css']
})
export class RunSelectorComponent implements OnInit{

  @Input() runs: IRun[] = []

  @Output() selectedRunChange: EventEmitter<IRun> = new EventEmitter<IRun>();

  run: IRun = {} as IRun;

  constructor() { }

  ngOnInit() {
  }

  onSelectedRunChange(run: IRun) {

    this.selectedRunChange.emit(run);
  }

}
