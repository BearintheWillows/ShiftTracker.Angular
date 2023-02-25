import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {ShopService} from "../../../../Root/services/shop.service";
import {IShop} from "../../../shops/Models/IShop";
import {map, Observable} from "rxjs";
import {IRun} from "../../models/iRun";
import {IRunVariant} from "../../models/iRunVariant";

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

  constructor(public bsModalRef: BsModalRef,
  public shopService: ShopService) {
  }

  ngOnInit(): void {
    this.getAvailableShops();
  }





  decline(): void {
    this.onClose.emit(false);
    this.bsModalRef?.hide();
  }

  getAvailableShops() {
    this.shopService.getAvailableShops(this.dayOfWeek).subscribe(
      (data : IShop[]) => {
        this.availableShops = data;
      }
    );
  }

  addShopToRunVariant() {

  }
}
