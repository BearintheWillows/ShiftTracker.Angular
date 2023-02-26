import {Component, EventEmitter, Input, NgZone, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {IRun} from "../../models/iRun";
import {RunService} from "../../../../Root/services/run.service";
import {Observable} from "rxjs";
import {IShop} from "../../../shops/Models/IShop";
import {RunCreateModalComponent} from "../run-create-modal/run-create-modal.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-run-selector',
  templateUrl: './run-selector.component.html',
  styleUrls: ['./run-selector.component.css']
})
export class RunSelectorComponent implements OnInit {

  runs$: Observable<IRun[]> = new Observable<IRun[]>(); // this is the observable that will be used to populate the run selector
  selectedRun? :IRun =  {} as IRun;

  modalRef?: BsModalRef;

  constructor(private runService: RunService,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this.runService.getAllRuns().then(
      () => {
        this.runs$ = this.runService.allRuns$;
        this.runs$.subscribe((runs: IRun[]) => {
          if(runs.length > 0) {
            this.runService.setSelectRun(runs[0]);
          }
        })
      }
    )
  }

  onSelectedRunChange(run: IRun) {
    this.runService.setSelectRun(run);
  }

  openAddRunModal() {
    this.modalRef = this.modalService.show(RunCreateModalComponent, {
      initialState: {
        title: 'Create Run',
        message: 'Create a new run',
      }
    });
    this.modalRef.content.onClose.subscribe((result: boolean) => {
      if(result) {
        this.runService.getAllRuns();
      }
    });
  }
}
