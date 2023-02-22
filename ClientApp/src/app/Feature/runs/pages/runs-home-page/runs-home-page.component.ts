import {Component, Input, NgZone, OnInit} from '@angular/core';
import {IRun} from "../../models/iRun";
import {RunService} from "../../../../Root/services/run.service";
import {Observable} from "rxjs";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FormType} from "../../../../Shared/enums/form-type";
import {ConfirmModalComponent} from "../../../../Shared/components/modals/confirmModal/confirm-modal.component";
import {
  ShopSelectionModealComponent
} from "../../../../Shared/components/modals/shop-selection-modeal/shop-selection-modeal.component";
import {RunCreateModalComponent} from "../../components/run-create-modal/run-create-modal.component";

@Component({
  selector: 'app-runs-home-page',
  templateUrl: './runs-home-page.component.html',
  styleUrls: ['./runs-home-page.component.css']
})
export class RunsHomePageComponent implements OnInit{

  runs$: Observable<IRun[]> = new Observable<IRun[]>(); // this is the observable that will be used to populate the run selector
  selectedRun: IRun = {} as IRun;
  $selectedRun: Observable<IRun> = new Observable<IRun>();


  modalRef?: BsModalRef;

  constructor(private runService: RunService,
              private ngZone: NgZone,
              private modalService: BsModalService
             ) { }

  onSelectedRun(run: IRun) {
    this.$selectedRun = this.runService.getRunByIdWithRunVariantsAndDeliveryPoints(run.id).pipe() as Observable<IRun>;
    this.$selectedRun.subscribe((run: IRun) => {
      this.selectedRun = run;
    })

  }

  ngOnInit(){
    this.runs$ = this.runService.runs$

  }

  async getAllRuns(){
    await this.runService.getAll();
    };

  openAddRunModal() {
    this.modalRef = this.modalService.show(RunCreateModalComponent, {
      initialState: {
        title: 'Create Run',
        message: 'Create a new run',
      }
    });
    this.modalRef.content.onClose.subscribe((result: boolean) => {
      if(result) {
        console.log("Modal closed with result: ");
      }
    });
  }
}
