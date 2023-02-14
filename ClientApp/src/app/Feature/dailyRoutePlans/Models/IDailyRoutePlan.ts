import {IRun} from "../../runs/models/iRun";

interface IDailyRoutePlan {
  id: number,

  dayOfWeek: number,
  dayOfWeekName: string,
  startTime: string,

  windowOpenTime: string,
  windowCloseTime: string,

  runId?: number,
  run?: IRun,

  shopId?: number,

  IShop?: IShop,


}
