import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {IRun} from "../../models/iRun";

@Component({
  selector: 'app-run-details',
  templateUrl: './run-details.component.html',
  styleUrls: ['./run-details.component.scss']
})
export class RunDetailsComponent implements OnInit, OnChanges{

  @Input() run: IRun = {} as IRun;


  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.run){
      console.log(`Run Details - ${this.run}`)
    }

  }

}
