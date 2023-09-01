import { HttpClient } from '@angular/common/http';
import {
  TRANSLOCO_LOADER,
  Translation,
  TranslocoLoader,
  TRANSLOCO_CONFIG,
  translocoConfig,
  TranslocoModule
} from '@ngneat/transloco';
import { Injectable, NgModule } from '@angular/core';
import { environment } from '../environments/environment';


@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) { }

  getTranslation(lang: string) {
     return this.http.get<Translation>(`${environment.assetsBaseUrl}/language/${lang}.json`);
  }

}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['ar', 'en'],
        defaultLang:localStorage.getItem('locale') === 'ar'  ? 'ar':'en' ,
        fallbackLang: localStorage.getItem('locale') === 'ar' ? 'en' : 'ar', 
        reRenderOnLangChange: true,
        prodMode: environment.production,
        missingHandler: {
          logMissingKey: true
      }
      })
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader }
  ]
})
export class TranslocoRootModule {
}
