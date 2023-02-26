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

@Component({
  selector: 'app-run-add-shop-modal',
  templateUrl: './run-add-shop-modal.component.html',
  styleUrls: ['./run-add-shop-modal.component.css']
})
export class RunAddShopModalComponent implements OnInit{

  @Input() title: string = '';
  @Input() message: string = '';
  @Input() dayOfWeek: number = 0;
  @Input() selectedRun: IRunVariant = {} as IRunVariant;

  @Output() onClose: EventEmitter<boolean> = new EventEmitter();

  selectedShop: IShop = {} as IShop;
  availableShops: IShop[] = [];

  modalRef?: BsModalRef;

  constructor(private bsModalRef: BsModalRef,
  private shopService: ShopService,
  private runService: RunService
  ){}

  ngOnInit(): void {
    this.getAvailableShops();
  }





  decline(): void {
    this.onClose.emit(false);
    this.bsModalRef?.hide();
  }

  async getAvailableShops() {
    await this.shopService.getAvailableShops(this.dayOfWeek).subscribe(
      (data : IShop[]) => {
        console.log(data);
        this.availableShops = data;
      }
    );
  }

  addShopToRunVariant() {
  console.log(this.selectedRun.deliveryPoints)
    let newDeliveryPoint = {
      runVariantId: this.selectedRun.id,
      shopId: this.selectedShop.id,
      dropNumber: this.selectedRun.deliveryPoints.length + 1,
      dayOfWeek: this.selectedRun.dayOfWeek,
      windowOpenTime: "1900-01-01T06:15:00",
      windowCloseTime: "1900-01-01T07:15:00"
    } as IDeliveryPoint;

    this.runService.addNewDeliveryPoint(newDeliveryPoint);

  }
}
