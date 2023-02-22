import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {IShift} from "../../Feature/shifts/models/iShift";
import {IShop} from "../../Feature/shops/Models/IShop";
import {IRun} from "../../Feature/runs/models/iRun";
import {DayOfWeekConversionPipe} from "../../Shared/pipes/day-of-week-conversion.pipe";

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private _shopSource = new BehaviorSubject<IShop[]>([]);

  shops$ = this._shopSource.asObservable();

  constructor(private http: HttpClient) {

  }

  private readonly _baseUrl = `https://localhost:7004/api/shop`;

  async getAll() : Promise<IShop[]> {
    return new Promise(async (resolve) => {
      (await this.http.get<IShop[]>(`${this._baseUrl}`)).subscribe((shops: IShop[]) => {
        this._shopSource.next(shops);
        resolve(shops);
      });
    })}

  getShopsByRunId(id: number): Observable<IShop[]>{
    return this.http.get<IShop[]>(`${this._baseUrl}/shoplist/run/${id}`);
  }

  getAvailableShops(runVariantDay: number): Observable<IShop[]>{
    console.log(DayOfWeekConversionPipe.prototype.transform(runVariantDay));
    console.log(`${this._baseUrl}/available?runVariantDay=${DayOfWeekConversionPipe.prototype.transform(runVariantDay)}`);
    return this.http.get<IShop[]>(`${this._baseUrl}/available?dayOfWeek=${DayOfWeekConversionPipe.prototype.transform(runVariantDay)}`);
  }
}
