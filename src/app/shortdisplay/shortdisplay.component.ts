import { assetUrl } from 'src/single-spa/asset-url';
import { Component, OnInit } from '@angular/core';
import { MumtalikatiService } from '.././services/mumtalikati.service'
import { RentalUnitDetail } from '../models/rental-unit-detail.model';
import { OwnerPropertyFilter, PropertyFilter } from '../models/PropertyFilter.model';
import { Input } from '@angular/core';
import { propertyMasterTypeEnum, propertySubTypeEnum } from '../models/enums';
import { Router } from '@angular/router';
@Component({
  selector: 'app-shortdisplay',
  templateUrl: './shortdisplay.component.html',
  styleUrls: ['./shortdisplay.component.scss']
})
export class ShortdisplayComponent implements OnInit {
  loading: boolean = false;
  showfooter!:boolean
  propertyDetail: RentalUnitDetail[] = [];
  areaimg = assetUrl("icons/Area.svg");
  bedroomimg = assetUrl("icons/Bedroom.svg");
  washroomimg = assetUrl("icons/Washroom.svg");
  bydefault = assetUrl('img/bydefault.png');
  location = assetUrl("icons/location.svg");
  filterCount: any;
@Input() listid!:number;
  propertyfilter = new PropertyFilter();
  @Input() property: OwnerPropertyFilter[] = []


  pagination: boolean = false;
  constructor( private router: Router,) { }
  ngOnInit(): void {


  }

  getsubType(subTypeId: number) {
    return propertySubTypeEnum(subTypeId);
  }
  getMasterTypeId(propertyMasterTypeId: number) {
    return propertyMasterTypeEnum(propertyMasterTypeId);
  }
  onclick(propertyMasterID: number, listingPurposeID: number, unitCategoryID: number, landLordID: number, propertyMasterTypeID: number,propertyMasterSubType:number) {

    this.router.navigate(
      ['Unitscategory'],
      { queryParams: { 'propertyMasterID': propertyMasterID, 'listingPurposeID': listingPurposeID, 'unitCategoryID': unitCategoryID, 'landLordID': landLordID, 'propertyMasterTypeID': propertyMasterTypeID } });
  }
}
