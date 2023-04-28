import { assetUrl } from 'src/single-spa/asset-url';
import { Component, OnInit } from '@angular/core';
import { MumtalikatiService } from '.././services/mumtalikati.service'
import { RentalUnitDetail } from '../models/rental-unit-detail.model';
import { OwnerPropertyFilter, PropertyFilter } from '../models/PropertyFilter.model';
import { Input } from '@angular/core';
import { listingPurposeTypeEnum, propertyMasterTypeEnum, propertySubTypeEnum } from '../models/enums';
import { Router } from '@angular/router';
import { SetupService } from '../services/setup.service';
import { PropertyUnitCategory } from '../models/propertyUnitCategory.model';
import { state } from '@angular/animations';
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
  unitCategoryID!: any
  constructor(private router: Router, private setservice: SetupService, private filterservice: FilterService) { }
  ngOnInit(): void {
    debugger
    this.setservice.getlistingpurposeset().then((data) => {

      this.listingPurposeID = data.find(x => x.listingPurposeType == this.listid)
    })
    this.setservice.getPropertyUnitCategoryTypes().then((data) => {
      this.unitCategoryTypes = data
    })

  }
  // getPropertyPurposeTypeid(){
  //   return listingPurposeTypeEnum()
  // }
  getsubType(subTypeId: number) {
    return propertySubTypeEnum(subTypeId);
  }
  getMasterTypeId(propertyMasterTypeId: number) {
    return propertyMasterTypeEnum(propertyMasterTypeId);
  }
  onclick(propertyMasterID: number, listingPurposeID: number, unitCategoryID: number, landLordID: number, propertyMasterTypeID: number) {
    debugger
    this.unitCategoryID = this.unitCategoryTypes.find(x => x.unitCategory == unitCategoryID)
    if (this.listingPurposeID == undefined) {
      let listid = this.filterservice.getPurposeid(1)
      this.router.navigate(
        ['Unitscategory'],
        {
          queryParams: { 'propertyMasterID': propertyMasterID, 'purpose': this.listid, 'unitCategory': this.unitCategoryID.desc, 'propertyMasterTypeID': this.mastertypeid, 'governorateid': this.governorateid, 'propertySubTypeid': this.subTypeId },
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
      debugger
      let listid = this.filterservice.getPurposeid(1)
      this.router.navigate(
        ['Unitscategory'],
        {
          queryParams: { 'propertyMasterID': propertyMasterID, 'purpose': this.listingPurposeID.desc, 'unitCategory': this.unitCategoryID.desc, 'propertyMasterTypeID': this.mastertypeid, 'governorateid': this.governorateid, 'propertySubTypeid': this.subTypeId },
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
