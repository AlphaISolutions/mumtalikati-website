import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getPropertyUnitCategoryEnum, listingPurposeTypeEnum, propertyMasterTypeEnum } from '../models/enums';
import { OwnerRentDetail } from '../models/ownerRentDetailmodel';
import { FilterService } from '../services/filterserice';

@Component({
  selector: 'app-breadcrumbpropertyfulldisplay',
  templateUrl: './breadcrumbpropertyfulldisplay.component.html',
  styleUrls: ['./breadcrumbpropertyfulldisplay.component.scss']
})
export class BreadcrumbpropertyfulldisplayComponent implements OnInit {
  @Input() propertyDetail: OwnerRentDetail[] = [];
  @Input() propertyMasterTypeID!: number;
  @Input() unitcatID!: number;
  @Input() landlordid!: number;
  @Input() listpurID!: number;
  @Input() pmid!: number;
  @Input() statuss!: number;
  @Input() page!: number;
  @Input() perpagenumber!: number
  @Input() maxValue!: number;
  @Input() minValue!: number;
  @Input() unitsid!: number;
  @Input() listingPurposeID!: number;
   @Input() propertyMasterType!: number;
  @Input() governorateid!: number;
  @Input() subTypeId!: number;
  @Input() propertyMasterSubType!:number;
  subid: any;
  constructor(private router: Router, private filterservice: FilterService) { }

  ngOnInit(): void {
  }
  addItem(newItem: number) {

    this.listpurID = newItem;
  }
  getenum(propertyMasterTypeID: number) {
    let pmtid = propertyMasterTypeID;
    this.propertyMasterTypeID = pmtid
    return propertyMasterTypeEnum(propertyMasterTypeID)
  }
  getlist(listid: number) {
    return listingPurposeTypeEnum(listid)
  }
  getunit(unitid: number) {
    return getPropertyUnitCategoryEnum(unitid)
  }

  backtosearch() {
    if (this.unitcatID == 12 || this.propertyMasterSubType==15) {
      this.subid = this.filterservice.getPropertytMasterSubTypeid(this.subTypeId);
      this.router.navigate(['propertydetails'], {
        queryParams: {
          'purpose': this.filterservice.getPurposeid(this.listingPurposeID),
          'governorate': this.filterservice.getGovernorateid(this.governorateid),
          'propertyMasterType': this.filterservice.getPropertytMasterTypeid(this.propertyMasterType),
          'propertyMasterSubType': this.subid,
          'unitCategory': this.filterservice.getPropertytUnitCategoryid(this.unitsid),
          'minValue': this.minValue,
          'maxValue': this.maxValue
        },

        state: {
          'purpose': this.listingPurposeID,
          'governorate': this.governorateid,
          'propertyMasterType': this.propertyMasterType,
          'propertyMasterSubType': this.subTypeId, 'minValue': this.minValue,
          'maxValue': this.maxValue, 'unitCategory': this.unitsid
        }
      });
    } else {
      this.router.navigate(['Unitscategory'], {
        queryParams: {
          'propertyMasterID': this.pmid,
          'purpose': this.getlist(this.listpurID),
          'unitCategory': this.getunit(this.unitcatID)
        },

        state: {
          'purpose': this.listingPurposeID,
          'governorate': this.governorateid,
          'propertyMasterType': this.propertyMasterType,
          'propertyMasterSubType': this.subTypeId, 'minValue': this.minValue,
          'maxValue': this.maxValue, 'unitCategory': this.unitsid
        }
      });
    }

  }
}
