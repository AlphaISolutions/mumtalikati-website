import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { assetUrl } from 'src/single-spa/asset-url';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {
  aboutSectionImg=assetUrl("img/aboutussetion.png");
  aboutbuildingImg=assetUrl("img/about-building.png");
  constructor(private router: Router,) { }

  ngOnInit(): void {
  }
  goTo(url: string) {
    this.router.navigateByUrl(url)
  }
}
