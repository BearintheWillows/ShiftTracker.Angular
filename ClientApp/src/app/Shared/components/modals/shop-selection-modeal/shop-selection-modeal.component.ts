import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {ConfirmModalComponent} from "../confirmModal/confirm-modal.component";
import {IShop} from "../../../../Feature/shops/Models/IShop";
import {ShopService} from "../../../../Root/services/shop.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-shop-selection-modeal',
  templateUrl: './shop-selection-modeal.component.html',
  styleUrls: ['./shop-selection-modeal.component.css']
})
export class ShopSelectionModealComponent implements ConfirmModalComponent, OnInit{

  @Input() title: string = '';
  @Input() message: string = '';
  @Input() template: string = '';
  @Input() runNumber: number = 0;
  @Input() runId: number = 0;

  shops$: Observable<IShop[]> = new Observable<IShop[]>();

  selectedShop: IShop = {} as IShop;
  modalRef?: BsModalRef;

  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public bsModalRef: BsModalRef,
    private _shopService: ShopService) {
  }

  ngOnInit() {
    this.shops$ = this._shopService.getShops();
  }


  confirm(): void {
    this.onClose.emit(true);
    this.bsModalRef?.hide();
  }

  decline(): void {
    this.onClose.emit(false);
    this.bsModalRef?.hide();
  }
}

