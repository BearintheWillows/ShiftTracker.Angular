import {IRun} from "./iRun";
import {IDeliveryPoint} from "./iDeliveryPoint";

export interface IRunVariant {
  id: number;
  dayOfWeek: number;
  startTime: string;
  runId: number;
  run: IRun;

  deliveryPoints: IDeliveryPoint[];
}
