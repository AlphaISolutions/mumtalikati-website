import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";

@Injectable({ providedIn: 'root' })

export class AssetsService {
    constructor(private http: HttpClient) { }
    apiprefix = "@assets-url";
    async getcontact(): Promise<any> {

        return await firstValueFrom(this.http.get(`${this.apiprefix}/doc/contact-us.md`, { responseType: 'text' }))
            .then(res => {  return res as any })
            .catch(err => { return Promise.reject('error'); });
    }
    async getcontactmum(): Promise<any> {

        return await firstValueFrom(this.http.get(`${this.apiprefix}/doc/ContactMumtalikati.md`, { responseType: 'text' }))
            .then(res => {  return res as any })
            .catch(err => { return Promise.reject('error'); });
    }
    async getAbout(): Promise<any> {

        return await firstValueFrom(this.http.get(`${this.apiprefix}/doc/about-us.md`, { responseType: 'text' }))
            .then(res => {  return res as any })
            .catch(err => { return Promise.reject('error'); });
    }
}
