
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  constructor(private http: HttpClient) { }
  async getCurrentCountry() {
    return this.http.get('http://ip-api.com/json').toPromise();;
  }
}
