import { Component, OnInit } from '@angular/core';
import { assetUrl } from 'src/single-spa/asset-url';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  logo = assetUrl('img/mumtalikati-logo-white.png')
  mapimg=assetUrl('img/map-particel.png.png')
  emailimag=assetUrl('icons/emailicon.png')
  phoneimg=assetUrl('icons/phoneicon.png')
  constructor() { }

  ngOnInit(): void {
  }

}
