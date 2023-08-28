import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { Area } from "../models/area";
@Injectable({ providedIn: 'root' })
export class AreaService {
    constructor(private http: HttpClient) { }
    async getArea(WilayatId: number): Promise<Area[]> {
        let queryParams = new HttpParams();
        queryParams = queryParams.append("WilayatId", WilayatId);
        return await firstValueFrom(this.http
          .get<Area[]>(
            `@mumtalikati-api/Address/GetAreas` ,{ params: queryParams }
          )).then(res => res as Area[]).catch(err => { return Promise.reject(err) });
      }
}