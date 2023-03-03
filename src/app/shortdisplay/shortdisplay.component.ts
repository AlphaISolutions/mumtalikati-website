import { assetUrl } from 'src/single-spa/asset-url';
import { Component, OnInit } from '@angular/core';
import {MumtalikatiService} from '.././services/mumtalikati.service'
import { RentalUnitDetail } from '../models/rental-unit-detail.model';
@Component({
  selector: 'app-shortdisplay',
  templateUrl: './shortdisplay.component.html',
  styleUrls: ['./shortdisplay.component.scss']
})
export class ShortdisplayComponent implements OnInit {
propertyDetail:RentalUnitDetail[]=[];
areaimg=assetUrl("icons/Area.svg");
bedroomimg=assetUrl("icons/Bedroom.svg");
washroomimg=assetUrl("icons/Washroom.svg");
bydefault = assetUrl('img/bydefault.png');
  constructor( private mumtalikatiservic:MumtalikatiService) { }

  ngOnInit(): void {
    this.PropertyDetail(3,1,1,1,4);
  }
  async PropertyDetail(propertyMasterTypeID: number, propertyMasterSubTypeID: number, listingPurposesID: number, pageNumber:number, rowsNumbers:number) {
    this.mumtalikatiservic.getPropertyDetailIndex(propertyMasterTypeID,propertyMasterSubTypeID,listingPurposesID,pageNumber,rowsNumbers)
      .then((data) => {
        if (data) {
          this.propertyDetail = data;
        }
 
      })
      .catch((error) => {
    
        console.error(error);
      });
  }
}
