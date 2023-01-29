import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IRun} from "../../interfaces/iRun";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RunService {
  private readonly _baseUrl = `https://localhost:7004/api/run`;
  constructor(private http: HttpClient) { }

   async getAll(): Promise<Observable<IRun[]>> {
    return this.http.get<IRun[]>(this._baseUrl);
  }
}
