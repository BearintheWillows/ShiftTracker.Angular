import {Component, Input, OnInit} from '@angular/core';
import {IDailyRoutePlan} from "../../../dailyRoutePlans/Models/IDailyRoutePlan";
import {IShop} from "../../../shops/Models/IShop";
import {ShopService} from "../../../../Root/services/shop.service";
import {Observable} from "rxjs";
import {BsModalService} from "ngx-bootstrap/modal";
import {IRunVariant} from "../../models/iRunVariant";
import {IDeliveryPoint} from "../../models/iDeliveryPoint";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-daily-route-shop-list',
  templateUrl: './daily-route-shop-list.component.html',
  styleUrls: ['./daily-route-shop-list.component.css'],

})
export class DailyRouteShopListComponent implements OnInit{

  @Input() DeliveryPoints: IDeliveryPoint[] = [];
  shops: IShop[] = {} as IShop[];

  isCollapsed = false;
  selectedDeliveryPoint: HTMLElement | null = null;

  collapsedStates: boolean[] = [];

  constructor(private _shopService: ShopService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
      this.collapsedStates = this.DeliveryPoints.map(() => true);
    }

  onCollapseClick(index: number) {
    this.collapsedStates[index] = !this.collapsedStates[index];
  }
}
