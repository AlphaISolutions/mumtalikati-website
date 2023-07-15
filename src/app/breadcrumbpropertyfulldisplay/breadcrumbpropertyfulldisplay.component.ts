import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getGovernorateEnumID, getPropertySubTypeEnumID, getPropertyUnitCategoryEnum, listingPurposeTypeEnum, listingPurposeTypeEnumid, propertyMasterTypeEnum, propertyMasterTypeEnumid } from '../models/enums';
import { OwnerRentDetail } from '../models/ownerRentDetailmodel';
import { FilterService } from '../services/filterserice';
import { State } from '../models/state.model';

@Component({
  selector: 'app-breadcrumbpropertyfulldisplay',
  templateUrl: './breadcrumbpropertyfulldisplay.component.html',
  styleUrls: ['./breadcrumbpropertyfulldisplay.component.scss']
})
export class BreadcrumbpropertyfulldisplayComponent implements OnInit {
  @Input() propertyDetail: OwnerRentDetail;
  @Input() propertyMasterTypeID!: number;
  @Input() unitcatID!: number;
  @Input() listpurID!: number;
  @Input() pmid!: number;
  @Input() propertyMasterSubType!: number;
  @Input() sharedmodel = new State
  subid: any;
  faicons:string;
  constructor(private router: Router, private filterservice: FilterService) { }

  ngOnInit(): void {
    this.button();
  }
  addItem(newItem: number) {
    this.listpurID = newItem;
  }
  getenum(propertyMasterTypeID: number) {
    let pmtid = propertyMasterTypeID;
    this.propertyMasterTypeID = pmtid
    return this.filterservice.getPropertytMasterTypeid(propertyMasterTypeID)
    // return propertyMasterTypeEnum(propertyMasterTypeID)
  }
  getlist(listid: number) {
    return listingPurposeTypeEnum(listid)
  }
  getunit(unitid: number) {
    return this.filterservice.getPropertytUnitCategoryid(unitid)
  }
  getUnitCatid(id:any) {
    return this.filterservice.getPropertytUnitCategoryid(id)
  }
  backtosearch() {
    if (this.unitcatID == 12 || this.propertyMasterSubType == 15) {
      this.subid = getPropertySubTypeEnumID(this.sharedmodel.propertyMasterSubTypeID!);
      this.router.navigate(['propertydetails'], {
        queryParams: {
          'purpose': listingPurposeTypeEnumid(this.sharedmodel.listingPurposesID!),
          'governorate': getGovernorateEnumID(this.sharedmodel.gOVERNORATEID!),
          'propertyMasterType': propertyMasterTypeEnumid(this.sharedmodel.propertyMasterTypeID!),
          'propertyMasterSubType': this.subid,
          'unitCategory': getPropertyUnitCategoryEnum(this.sharedmodel.propertyCategory!),
          'minValue': this.sharedmodel.minPrice,
          'maxValue': this.sharedmodel.maxPrice
        }

      });
    } else {
      this.router.navigate(['Unitscategory'], {
        queryParams: {
          'propertyMasterID': this.pmid,
          'purpose': listingPurposeTypeEnumid(this.listpurID),
          'unitCategory': getPropertyUnitCategoryEnum(this.unitcatID)
        },
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

  }
  button() {
    if (localStorage.getItem('locale') == 'ar') {
      this.faicons ='fa-angle-right';
    }else{
      this.faicons ='fa-angle-left';
    }
  }
}
