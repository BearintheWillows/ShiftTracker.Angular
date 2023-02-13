import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {IRun} from "../../models/iRun";
import {Observable} from "rxjs";

@Component({
  selector: 'app-run-details',
  templateUrl: './run-details.component.html',
  styleUrls: ['./run-details.component.scss']
})
export class RunDetailsComponent implements OnInit, OnChanges{

  @Input() $run: Observable<IRun> = new Observable<IRun>();
  run: IRun = {} as IRun;


  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges){


  }

}
