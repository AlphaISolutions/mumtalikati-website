import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { assetUrl } from 'src/single-spa/asset-url';
import { AssetsService } from '../services/assetsServiceservice';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {
  aboutSectionImg=assetUrl("img/aboutussetion.png");
  aboutbuildingImg=assetUrl("img/about-building.png");
  markdown!:string;
  constructor(private router: Router,private assetsService:AssetsService) { }

  ngOnInit(): void {
    this.getAbout();
  }
  goTo(url: string) {
    this.router.navigateByUrl(url)
  }
  async getAbout() {
    this.assetsService.getAbout()
      .then((data) => {
        if (data !== null) {
          this.markdown = data;
      
        }
      })
      .catch((error) => {
       
      });
  }
}
