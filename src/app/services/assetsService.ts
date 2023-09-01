import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import {
    TRANSLOCO_LOADER,
    Translation,
    TranslocoLoader,
    TRANSLOCO_CONFIG,
    translocoConfig,
    TranslocoModule
  } from '@ngneat/transloco';
@Injectable({ providedIn: 'root' })
export class AssetsServices {
    constructor(private http: HttpClient) { }
    // async getlocalization(lang:string) {
    //     return await firstValueFrom(this.http
    //         .get<Translation>(
    //             `https://d2og5lryw1ajtt.cloudfront.net/language/${lang}.json`
    //         )).then(res => res as Translation).catch(err => { return Promise.reject(err) });
    // }
}
