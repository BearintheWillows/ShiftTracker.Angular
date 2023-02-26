import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {IDailyRoutePlan} from "../../../dailyRoutePlans/Models/IDailyRoutePlan";
import {IShop} from "../../../shops/Models/IShop";
import {ShopService} from "../../../../Root/services/shop.service";
import {Observable} from "rxjs";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {IRunVariant} from "../../models/iRunVariant";
import {IDeliveryPoint} from "../../models/iDeliveryPoint";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {RunCreateModalComponent} from "../run-create-modal/run-create-modal.component";
import {RunAddShopModalComponent} from "../run-add-shop-modal/run-add-shop-modal.component";
import {IRun} from "../../models/iRun";
import {RunService} from "../../../../Root/services/run.service";

@Component({
  selector: 'app-daily-route-shop-list',
  templateUrl: './daily-route-shop-list.component.html',
  styleUrls: ['./daily-route-shop-list.component.css'],

})
export class DailyRouteShopListComponent implements OnInit, AfterContentInit{

  selectedRun$: Observable<IRun> = new Observable<IRun>();

  @Input() dayOfWeek: number = 1;
  shops: IShop[] = {} as IShop[];
  deliveryPoints: IDeliveryPoint[] = {} as IDeliveryPoint[];
  isCollapsed = false;
  selectedDeliveryPoint: HTMLElement | null = null;

  modalRef?: BsModalRef;

  collapsedStates: boolean[] = [];

  constructor(private _shopService: ShopService,
              private modalService: BsModalService,
              private runService: RunService) { }

  ngAfterContentInit() {

  }

  ngOnInit(): void {

    this.selectedRun$ = this.runService.selectedRun$;
    this.selectedRun$.subscribe((run: IRun) => {
      if(run != null) {
        console.log(run)
        this.deliveryPoints = run.dailyRoutes.find(x => x.dayOfWeek == this.dayOfWeek)?.deliveryPoints ?? [];



        let dropNumber = 1;
        this.deliveryPoints.forEach((deliveryPoint) => {
          deliveryPoint.dropNumber = dropNumber;
          dropNumber++;
        })
      }
    })
  }

  onCollapseClick(index: number) {
    this.collapsedStates[index] = !this.collapsedStates[index];
  }

  openAddShopModal() {
    this.modalRef = this.modalService.show(RunAddShopModalComponent, {
      initialState: {
        title: 'Create Run',
        message: 'Create a new run',
        dayOfWeek: this.dayOfWeek,
      }
    });
    this.modalRef.content.onClose.subscribe((result: boolean) => {
      if(result) {
        console.log("Modal closed with result: ");
      }
    });
  }
}
