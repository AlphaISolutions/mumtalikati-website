
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegionModel } from '../models/region.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  constructor(private http: HttpClient) { }
  async getCurrentCountry():Promise<RegionModel> {
    return await firstValueFrom(this.http
      .get<RegionModel>(
        `http://ip-api.com/json`
      )).then(res => res as RegionModel).catch(err => { return Promise.reject(err) });

   
  }
}
      // return await this.http.get('http://ip-api.com/json').toPromise();