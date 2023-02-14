import {IDailyRoutePlan} from "../../../../interfaces/iDailyRoutePlan";

interface IShop {

  id: number;
  name: string;
  number: number,
  street: string,
  street2?: string,

  city: string,
  country: string,

  postcode: string,

  phoneNumber: number,

  DailyRoutes: IDailyRoutePlan[]
}
