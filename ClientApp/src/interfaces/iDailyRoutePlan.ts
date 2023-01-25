import {IShop} from "./iShop";
import {IRun} from "./iRun";

export interface IDailyRoutePlan{
  id: number;
  dayOfWeek: number;
  windowOpenTime: Date;
  windowCloseTime: Date;
  runId?: number;
  run?: IRun;
  shopId?: number;
  shop?: IShop;
}
