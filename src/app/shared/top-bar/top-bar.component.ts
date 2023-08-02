import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterStateSnapshot } from '@angular/router';
import { LoginComponent } from 'src/app/sign-up/login/login.component';
import { assetUrl } from 'src/single-spa/asset-url';
import { HttpClient } from '@angular/common/http';
import {
  TranslocoService
} from '@ngneat/transloco';
import { Subscription, filter } from 'rxjs';
import { SetFiltersServive } from 'src/app/services/setfilters.servive';
import { Location } from '@angular/common';
import { GeolocationService } from 'src/app/services/geolocation.service';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  language = localStorage.getItem('locale');
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
  coler: any;
  selectedLanguage: string = 'en';
  url: string;
  path: string;
  public selectedLocale: string = this.localeId;
  private langChangeSubscription: Subscription;
  direction: string = this.service.getActiveLang() === 'ar' ? 'ltr' : 'rtl';
  currentRoute: any;

  constructor(@Inject(LOCALE_ID) private localeId: string, public dialog: MatDialog, private router: Router, private http: HttpClient, private service: TranslocoService, private setFiltersServive: SetFiltersServive, private route: ActivatedRoute, private location: Location) {
    this.langChangeSubscription = this.service.langChanges$.subscribe(() => {
      this.direction = this.service.getActiveLang() === 'ar' ? 'rtl' : 'ltr';
    });
    this.path = this.route.component.name
  }
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
  changeLanguage(event) {
    if (this.language == "ar") {
      localStorage.setItem('locale', event.value);
      this.service.setActiveLang('ar')
      this.setFiltersServive.stopSession()
      this.direction = event.value === 'ar' ? 'rtl' : 'ltr';
      // this.getpath()
      window.location.reload();
    } else {
      localStorage.setItem('locale', event.value);
      this.service.setActiveLang('en')
      this.setFiltersServive.stopSession()
      this.direction = event.value === 'ar' ? 'rtl' : 'ltr';
      window.location.reload();
      // this.getpath()
    }


  }
  ngOnDestroy() {
    this.langChangeSubscription.unsubscribe();
  }
  getpath() {
    if (this.path == "AboutusComponent" || this.path == "ContactusComponent") {

    } else {
      window.open('/', '_self');
      // window.location.reload();
    }
  }
}
