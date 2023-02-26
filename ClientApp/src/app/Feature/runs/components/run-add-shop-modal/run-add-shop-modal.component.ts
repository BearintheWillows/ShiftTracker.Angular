import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {FormsModule} from "@angular/forms";
import {ShopService} from "../../../../Root/services/shop.service";
import {IShop} from "../../../shops/Models/IShop";
import {map, Observable} from "rxjs";
import {IRun} from "../../models/iRun";
import {IRunVariant} from "../../models/iRunVariant";
import {RunService} from "../../../../Root/services/run.service";
import {IDeliveryPoint} from "../../models/iDeliveryPoint";
import {TimeFormatForDateTimePipe} from "../../../../Shared/pipes/time-format.pipe";

@Component({
  selector: 'app-run-add-shop-modal',
  templateUrl: './run-add-shop-modal.component.html',
  styleUrls: ['./run-add-shop-modal.component.css']
})
export class RunAddShopModalComponent implements OnInit{

  @Input() title: string = '';
  @Input() message: string = '';
  @Input() dayOfWeek: number = 0;

  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  selectedRun$: Observable<IRun> = new Observable<IRun>();
  selectedShop: IShop = {} as IShop;
  availableShops: IShop[] = [];

  modalRef?: BsModalRef;

  constructor(private bsModalRef: BsModalRef,
  private shopService: ShopService,
  private runService: RunService
  ){}

  ngOnInit(): void {
    this.selectedRun$ = this.runService.selectedRun$;
    this.getAvailableShops();
  }


  decline(): void {
    this.onClose.emit(false);
    this.bsModalRef?.hide();
  }

  accept(): void {
    this.onClose.emit(true);
    this.bsModalRef?.hide();
  }

  async getAvailableShops() {
    await this.shopService.getAvailableShops(this.dayOfWeek).subscribe(
      (data : IShop[]) => {
        console.log(data);
        this.availableShops = data;
      });
  }

  addShopToRunVariant() {
     let newDeliveryPoint: IDeliveryPoint = {} as IDeliveryPoint;
      newDeliveryPoint.shopId = this.selectedShop.id;
      this.selectedRun$.subscribe((run: IRun) => {
        let runVariant = run.dailyRoutes.find(x => x.dayOfWeek == this.dayOfWeek);
        console.log(runVariant);
        run.dailyRoutes.forEach((dailyRoute) => {
          if(dailyRoute.dayOfWeek == this.dayOfWeek) {
            newDeliveryPoint.runVariantId = dailyRoute.id;
            newDeliveryPoint.dropNumber = dailyRoute.deliveryPoints.length + 1;
          }
        });
      });
      newDeliveryPoint.dayOfWeek = this.dayOfWeek;
      newDeliveryPoint.windowOpenTime = TimeFormatForDateTimePipe.prototype.transform("08:00:00");
      newDeliveryPoint.windowCloseTime = TimeFormatForDateTimePipe.prototype.transform("09:00:00");
      newDeliveryPoint.windowOpenTime = TimeFormatForDateTimePipe.prototype.transform("08:00:00");
      newDeliveryPoint.shop = this.selectedShop;
      newDeliveryPoint.runVariant = {} as IRunVariant;
console.log(newDeliveryPoint)
      this.runService.addDeliveryPoint(newDeliveryPoint).subscribe(
        (data : IRun) => {
          console.log(data);
          this.runService.setSelectRun(data);
          this.accept();
        }
      );

  }
}
