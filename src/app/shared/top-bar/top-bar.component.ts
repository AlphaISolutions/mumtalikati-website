import { Component, Input, OnInit } from '@angular/core';
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
  colorFlag: boolean = true;
  coler: any;
  ngOnInit() {
    if(this.active==true){

    }
    else{
      this.coler={' background-color':'red'}
    }
    // if (this.colorFlag == true) {

    // }
    // else {
    //   this.coler = { ' background-color': 'red' }
    // }
    if (this.data) {
      this.logo = assetUrl('img/mumtalikati-logo-white.png');
    } else {
      this.logo = assetUrl('img/mumtalikatilogred.png')
    }

  }
  constructor() { }
  // active(){
  //   this.coler={' background-color':'red'}
  // }
}
