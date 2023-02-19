import {Component, Input, OnInit} from '@angular/core';
import {IDailyRoutePlan} from "../../../dailyRoutePlans/Models/IDailyRoutePlan";
import {IShop} from "../../../shops/Models/IShop";
import {ShopService} from "../../../../Root/services/shop.service";
import {Observable} from "rxjs";
import {BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-daily-route-shop-list',
  templateUrl: './daily-route-shop-list.component.html',
  styleUrls: ['./daily-route-shop-list.component.css']
})
export class DailyRouteShopListComponent implements OnInit{

  @Input() routes: IDailyRoutePlan[] = [];
  shops: IShop[] = {} as IShop[];

  constructor(private _shopService: ShopService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
      console.log(this.routes);
    }

  // getShops() {
  //   if(this.route.runId != null) {
  //     (this._shopService.getShopsByRunId(this.route.runId)).subscribe((shops => {
  //       this.shops = shops;
  //     }));
  //   }
  //   ;
  // }
}
