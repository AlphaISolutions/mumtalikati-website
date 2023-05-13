import { assetUrl } from 'src/single-spa/asset-url';
import { Component, OnInit } from '@angular/core';
import { RentalUnitDetail } from '../models/rental-unit-detail.model';
import { OwnerPropertyFilter, PropertyFilter } from '../models/PropertyFilter.model';
import { Input } from '@angular/core';
import { propertyMasterTypeEnum, propertySubTypeEnum } from '../models/enums';
import { Router } from '@angular/router';
import { SetupService } from '../services/setup.service';
import { PropertyUnitCategory } from '../models/propertyUnitCategory.model';
import { FilterService } from '../services/filterserice';
@Component({
  selector: 'app-shortdisplay',
  templateUrl: './shortdisplay.component.html',
  styleUrls: ['./shortdisplay.component.scss']
})
export class ShortdisplayComponent implements OnInit {
  loading: boolean = false;
  showfooter!: boolean
  propertyDetail: RentalUnitDetail[] = [];
  areaimg = assetUrl("icons/Area.svg");
  bedroomimg = assetUrl("icons/Bedroom.svg");
  washroomimg = assetUrl("icons/Washroom.svg");
  bydefault = assetUrl('img/bydefault.png');
  location = assetUrl("icons/location.svg");
  filterCount: any;
  // @Input() datalist!: string
  @Input() listid!: number;
  propertyfilter = new PropertyFilter();
  @Input() property: OwnerPropertyFilter[] = []
  @Input() governorateid!: number;
  @Input() subTypeId!: number;
  @Input() mastertypeid!: number;
  @Input() minValue!: number;
  @Input() maxValue!: number;
  @Input() unitcategoryid!: number;
  listingPurposeID: any
  unitCategoryTypes: PropertyUnitCategory[] = [];
  pagination: boolean = false;
  unitCategoryId!: any
  liststring!: any;
  propertyMasterSubTypeid !: number;
  constructor(private router: Router, private setservice: SetupService, private filterservice: FilterService) { }
  ngOnInit(): void {
    this.setservice.getlistingpurposeset().then((data) => {

      this.listingPurposeID = data.find(x => x.listingPurposeType == this.listid)
    })
    this.setservice.getPropertyUnitCategoryTypes().then((data) => {
      this.unitCategoryTypes = data
    })

  }

  getsubType(subTypeId: number) {
    return propertySubTypeEnum(subTypeId);
  }
  getMasterTypeId(propertyMasterTypeId: number) {
    return propertyMasterTypeEnum(propertyMasterTypeId);
  }
  onclick(unitCategoryID: number, landLordID: number, propertyMasterID: number, propertyMasterSubType: number,listingPurposeID:number) {
    // this.unitCategoryId = this.unitCategoryTypes.find(x => x.unitCategory == unitCategoryID)
    this.unitCategoryId=this.filterservice.getPropertytUnitCategoryid(unitCategoryID)
    this.liststring = this.filterservice.getPurposeid(listingPurposeID)
    this.propertyMasterSubTypeid = propertyMasterSubType
    if (propertyMasterSubType == 15) {
      this.router.navigate(['propertyfulldisplay'],
        {
          queryParams: { 'unitCategory': this.unitCategoryId, 'landlord': landLordID, 'propertyMaster': propertyMasterID, 'propertyUnit': 0 },
          state: {
            'purpose': this.listingPurposeID,
            'governorate': this.governorateid,
            'propertyMasterType': this.mastertypeid,
            'propertyMasterSubType': this.subTypeId, 'minValue': this.minValue,
            'maxValue': this.maxValue,
            'unitCategory': this.unitcategoryid,
            'propertyMasterSubtype': this.propertyMasterSubTypeid
          }
        });
    }
    else if (unitCategoryID == 12) {
      this.router.navigate(['propertyfulldisplay'],
        {
          queryParams: { 'unitCategory': this.unitCategoryId, 'landlord': landLordID, 'propertyMaster': propertyMasterID, 'propertyUnit': 0 },
          state: {
            'purpose': this.listingPurposeID,
            'governorate': this.governorateid,
            'propertyMasterType': this.mastertypeid,
            'propertyMasterSubType': this.subTypeId, 'minValue': this.minValue,
            'maxValue': this.maxValue, 'unitCategory': this.unitcategoryid
          }
        });
    }
    else if(listingPurposeID ==1){
      this.router.navigate(
        ['Unitscategory'],
        {
          queryParams: { 'purpose': this.liststring, 'unitCategory': this.unitCategoryId, 'propertyMasterID': propertyMasterID },
          state: {
            'purpose': this.listid,
            'governorate': this.governorateid,
            'propertyMasterType': this.mastertypeid,
            'propertyMasterSubType': this.subTypeId,
            'unitCategory': this.unitcategoryid,
            'minValue': this.minValue,
            'maxValue': this.maxValue
          }
        });
    }
    else {
      this.router.navigate(
        ['Unitscategory'],
        {
          queryParams: { 'purpose': this.listingPurposeID.desc, 'unitCategory': this.unitCategoryId, 'propertyMasterID': propertyMasterID },
          state: {
            'purpose': this.listid,
            'governorate': this.governorateid,
            'propertyMasterType': this.mastertypeid,
            'propertyMasterSubType': this.subTypeId,
            'unitCategory': this.unitcategoryid,
            'minValue': this.minValue,
            'maxValue': this.maxValue
          }
        });
    }
  }
}
