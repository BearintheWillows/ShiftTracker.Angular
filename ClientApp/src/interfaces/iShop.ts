import {IDailyRoutePlan} from "./iDailyRoutePlan";

export interface IShop {
  id: number;
  name: string;
  number? : number;
  street: string;
  street2?: string;
  city: string;
  county: string;
  postcode: string;
  phoneNumber: number;

  dayVariants?: IDailyRoutePlan[];
