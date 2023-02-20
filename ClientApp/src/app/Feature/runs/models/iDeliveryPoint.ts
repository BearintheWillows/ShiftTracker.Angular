import {IRunVariant} from "./iRunVariant";
import {IShop} from "../../shops/Models/IShop";

export interface IDeliveryPoint {
  id: number;
  dropNumber: number;
  dayOfWeek: number;
  windowOpenTime: string;
  windowCloseTime: string;
  runVariantId: number;
  runVariant: IRunVariant;
  shopId: number;
  shop: IShop;
}
