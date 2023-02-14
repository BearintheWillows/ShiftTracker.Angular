import {IDailyRoutePlan} from "../../../../interfaces/iDailyRoutePlan";

export interface IRun {
  id: number;
  number: number;
  Location: string;

  DailyRoutes: IDailyRoutePlan[]

}
