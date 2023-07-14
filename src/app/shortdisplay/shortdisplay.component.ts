import { assetUrl } from 'src/single-spa/asset-url';
import { Component, OnInit } from '@angular/core';
import { RentalUnitDetail } from '../models/rental-unit-detail.model';
import { OwnerPropertyFilter, PropertyFilter } from '../models/PropertyFilter.model';
import { Input } from '@angular/core';
import { getPropertyUnitCategoryEnum, listingPurposeTypeEnumid, propertyMasterTypeEnum, propertySubTypeEnum } from '../models/enums';
import { Router } from '@angular/router';
import { FilterService } from '../services/filterserice';
import { State } from '../models/state.model';

@Component({
  selector: 'app-shortdisplay',
  templateUrl: './shortdisplay.component.html',
  styleUrls: ['./shortdisplay.component.scss']
})
export class ShortdisplayComponent implements OnInit {
  loading: boolean = false;
  areaimg = assetUrl("icons/Area.svg");
  bedroomimg = assetUrl("icons/Bedroom.svg");
  washroomimg = assetUrl("icons/Washroom.svg");
  defaultimage = assetUrl('img/bydefault.png');
  location = assetUrl("icons/location.svg");
  propertyfilter = new PropertyFilter();
  @Input() property: OwnerPropertyFilter[] = []
  @Input() sharedmodel = new State;
  unitCategoryId!: any
  liststring!: any;
  propertyMasterSubTypeid !: number;
  data: any
  constructor(private router: Router, private filterservice: FilterService) { }
  async ngOnInit() {

  }
  getsubType(subTypeId: number) {
    return this.filterservice.getPropertytMasterSubTypeid(subTypeId)
    // return propertySubTypeEnum(subTypeId);
  }
  getMasterTypeId(propertyMasterTypeId: number) {
    return propertyMasterTypeEnum(propertyMasterTypeId);
  }
  getunitcatid(id: number) {
    return this.filterservice.getPropertytUnitCategoryid(id)
  }
  onclick(unitCategoryID: number, landLordID: number, propertyMasterID: number, propertyMasterSubType: number, listingPurposeID: number) {
    this.unitCategoryId =getPropertyUnitCategoryEnum(unitCategoryID)
    this.liststring = listingPurposeTypeEnumid(listingPurposeID)
    this.propertyMasterSubTypeid = propertyMasterSubType
    if (propertyMasterSubType == 15) {
      this.navigatefulldisplay(landLordID, propertyMasterID, propertyMasterSubType)
    }
    else if (unitCategoryID == 12) {
      this.navigatefulldisplay(landLordID, propertyMasterID, propertyMasterSubType)
    }
    else if (listingPurposeID == 1) {
      this.navigateunitscategory(propertyMasterID)
    }
    else {
      this.navigateunitscategory(propertyMasterID)
    }
  }
  navigateunitscategory(propertyMasterID: number) {
    this.router.navigate(
      ['Unitscategory'],
      {
        queryParams: { 'purpose': this.liststring, 'unitCategory': this.unitCategoryId, 'propertyMasterID': propertyMasterID },
        state: {
          'purpose': this.sharedmodel.listingPurposesID,
          'governorate': this.sharedmodel.gOVERNORATEID,
          'propertyMasterType': this.sharedmodel.propertyMasterTypeID,
          'propertyMasterSubType': this.sharedmodel.propertyMasterSubTypeID,
          'unitCategory': this.sharedmodel.propertyCategory,
          'minValue': this.sharedmodel.minPrice,
          'maxValue': this.sharedmodel.maxPrice
        }
      });
  }
  navigatefulldisplay(landLordID: number, propertyMasterID: number, propertyMasterSubType: number) {

    this.router.navigate(['propertyfulldisplay'],
      {
        queryParams: { 'unitCategory': this.unitCategoryId, 'landlord': landLordID, 'propertyMaster': propertyMasterID, 'propertyUnit': 0 },
        state: {
          'purpose': this.sharedmodel.listingPurposesID,
          'governorate': this.sharedmodel.gOVERNORATEID,
          'propertyMasterType': this.sharedmodel.propertyMasterTypeID,
          'propertyMasterSubType': this.sharedmodel.propertyMasterSubTypeID,
          'unitCategory': this.sharedmodel.propertyCategory,
          'minValue': this.sharedmodel.minPrice,
          'maxValue': this.sharedmodel.maxPrice,
          'propertyMasterSubtype': propertyMasterSubType
        }
      });
  }
}
