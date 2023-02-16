import {Component, Input} from '@angular/core';
import {IDailyRoutePlan} from "../../../dailyRoutePlans/Models/IDailyRoutePlan";

@Component({
  selector: 'app-daily-route-shop-list',
  templateUrl: './daily-route-shop-list.component.html',
  styleUrls: ['./daily-route-shop-list.component.css']
})
export class DailyRouteShopListComponent {

  @Input() route: IDailyRoutePlan = {} as IDailyRoutePlan;
}
