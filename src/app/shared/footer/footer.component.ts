import { Component, Input, OnInit } from '@angular/core';
import { assetUrl } from 'src/single-spa/asset-url';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  logo = assetUrl('img/mumtalikati-logo-white.png')
  mapimg=assetUrl('img/map-particel.svg')
  emailimag=assetUrl('icons/emailicon.png')
  phoneimg=assetUrl('icons/phoneicon.png')
  googleplay = assetUrl("img/Appstorephoto.png");
  appstore = assetUrl("img/Playstore.png");
  constructor() {} 

  ngOnInit(): void {
   
  }
  opengoogleplay() {
   window.open('https://play.google.com/store/apps/details?id=com.alphai.mumtalikati.app_mumtalikati')
  }
openappstore(){
  window.open('https://apps.apple.com/pk/app/mumtalikati/id1612677788')
}
}
