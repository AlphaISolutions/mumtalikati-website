import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InterceptorService } from 'src/app/services/interceptor.service';
import { LoginComponent } from 'src/app/sign-up/login/login.component';
import { assetUrl } from 'src/single-spa/asset-url';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import {
  TranslocoService
} from '@ngneat/transloco';
import { from, map, switchMap } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';
import { SetFiltersServive } from 'src/app/services/setfilters.servive';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  language = localStorage.getItem('locale') || 'ar';
  logo: any
  checked: boolean;
  shownnow: boolean = true;
  collapsed = true;
  addPropperty: boolean = false;
  public isMenuCollapsed = true;
  navbarOpen = false;
  @Input() childStyle: any;
  @Input() logred: any;
  @Input() data: boolean = true;
  @Input() active: any;
  @Input() activeroute: any;
  colorFlag: boolean = true;
  @Input() btncolor: any;
  @Input() togglericon: any;
  liststring: string = 'Rent';
  governoratestring = 'All';
  propertyMasterTypestring = 'All';
  propertyMasterSubTypeIDstring = 'All';
  unitcategorystring = 'All';
  minValue = 0;
  maxValue = 10000;
  coler: any;
  selectedLanguage: string = 'en';
  public selectedLocale: string = this.localeId;

  constructor(@Inject(LOCALE_ID) private localeId: string, public dialog: MatDialog, private router: Router, private http: HttpClient, private service: TranslocoService, private setFiltersServive: SetFiltersServive) { }
  public locales: any = [
    { name: "English", code: "en-US" },
    { name: "Arabic", code: "ar" },
  ]
  ngOnInit() {
    if (this.activeroute == true) {

    } else {
      this.coler = { ' background-color': 'red' }
    }

    if (this.active == true) {

    }
    else {
      this.coler = { ' background-color': 'red' }
    }

    if (this.data) {
      this.logo = assetUrl('img/mumtalikati-logo-white.png');
    } else {
      this.logo = assetUrl('img/mumtalikatilogred.png')
    }

  }
  closeNav() {
    this.collapsed = false;
  }
  openDialog(): void {

    this.dialog.open(LoginComponent, {

    });
    this.dialog.afterAllClosed.subscribe(() => {

    })

  }
  getUrl() {
    this.router.navigate(
      ['propertydetails/', this.liststring]
    )
  }
  getlanguage() {

    // const headers = new HttpHeaders().set('Accept-Language', 'en'); 

  }
  // changePath(code: string) {
  //   this.router.navigateByUrl(`/${code}/`);
  // }

  // changeLanguage(isEnglish: boolean): void {
  //   const language = isEnglish ? 'ar' : 'ar';
  //   this.http.get('angular.json').subscribe((angularJson: any) => {
  //     angularJson.projects['mumtalikati-website'].architect.build.options.localize[0].i18n.locales[language] =
  //       `src/locale/messages.${language}.xlf`;
  //     this.http
  //       .put('angular.json', angularJson)
  //       .subscribe(() => {
  //         console.log(`Language changed to ${language}`);
  //       });
  //   });
  // }
  // readAngularJsonFile(): void {
  //   this.http.get('angular.json').subscribe((data: any) => {
  //     console.log(data);
  //   });
  // }
  // getTranslation(lang: string) {
  //   const defaultLang = 'en';
  //   const requestLang = lang || defaultLang;
  //   const requestUrl = `src/locale/messages.${requestLang}.xlf`;

  //   return this.http.get<Translation>(requestUrl, {
  //     headers: new HttpHeaders().set('Accept-Language', requestLang)
  //   });
  // }
  changeLanguage(event) {
    if(this.language== "ar"){
      localStorage.setItem('locale', event.value);
      this.service.setActiveLang('ar')
      this.setFiltersServive.stopSession()
      window.open('/', '_self');
    }else{
      localStorage.setItem('locale', event.value);
      this.service.setActiveLang('en')
      this.setFiltersServive.stopSession()
      window.open('/', '_self');
    }
   

  }
}
