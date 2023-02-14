import {IDailyRoutePlan} from "../../dailyRoutePlans/Models/IDailyRoutePlan";

export interface IRun {
  id: number;
  number: number;
  location: string;

  dailyRoutes: IDailyRoutePlan[];

}
