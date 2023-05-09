import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/sign-up/login/login.component';


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
  liststring:string='Rent';
  governoratestring='All';
  propertyMasterTypestring='All';
  propertyMasterSubTypeIDstring='All';
  unitcategorystring='All';
  minValue=0;
  maxValue=10000;
  
  coler: any;
  constructor(public dialog: MatDialog,private router: Router) { }
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
  getUrl(){
    debugger
    this.router.navigate(
      ['propertydetails/',this.liststring] 
      )
    }
    // getUrl(){
    //   debugger
    //   this.router.navigate(
    //     ['propertydetails/purpose/governorate/propertyMasterType/propertyMasterSubType/unitCategory/minValue/maxValue',this.liststring,this.governoratestring,this.propertyMasterTypestring,this.propertyMasterSubTypeIDstring,this.unitcategorystring,this.minValue,this.maxValue] 
    //     )
    //   }
}


