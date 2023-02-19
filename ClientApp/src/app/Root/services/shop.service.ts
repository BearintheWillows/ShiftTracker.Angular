import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IShift} from "../../Feature/shifts/models/iShift";
import {IShop} from "../../Feature/shops/Models/IShop";
import {IRun} from "../../Feature/runs/models/iRun";

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) {

  }

  private readonly _baseUrl = `https://localhost:7004/api/shop`;

  getShops(): Observable<IShop[]>{
    return this.http.get<IShop[]>(`${this._baseUrl}`);
  }

  getShopsByRunId(id: number): Observable<IShop[]>{
    return this.http.get<IShop[]>(`${this._baseUrl}/shoplist/run/${id}`);
  }
}
