import {IDailyRoutePlan} from "../../dailyRoutePlans/Models/IDailyRoutePlan";
import {IRunVariant} from "./iRunVariant";

export interface IRun {
  id: number;
  number: number;
  location: string;

  dailyRoutes: IRunVariant[];

}
