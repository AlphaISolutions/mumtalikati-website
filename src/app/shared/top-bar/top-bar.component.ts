import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/login/login.component';

import { assetUrl } from 'src/single-spa/asset-url';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  logo: any
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
  @Input() togglericon:any;
  coler: any;
  constructor(public dialog: MatDialog) { }
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
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.closeNav();
    this.dialog.open(LoginComponent, {
    
    });
    this.dialog.afterAllClosed.subscribe(() => {
      // this.bsSignupService.onboardingStep$.next(1);
      // this.bsSignupService.investorType$.next(null);
      // this.bsSignupService.userRole$.next(null);
    })
  }
}


