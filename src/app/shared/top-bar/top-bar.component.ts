import { Component, OnInit } from '@angular/core';
import { assetUrl } from 'src/single-spa/asset-url';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
 
  logo = assetUrl('img/mumtalikati-logo-white.png')
  collapsed = true;
  public isMenuCollapsed = true;
  navbarOpen = false;
  ngOnInit() { 
}


  constructor() { }


}
