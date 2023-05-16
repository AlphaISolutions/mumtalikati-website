import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getstatusType } from '../models/enums';
import { OwnerPropertyMasterIndiviualUnits } from '../models/ownerPropertyMasterIndiviualUnits.model';
import { assetUrl } from 'src/single-spa/asset-url';
import { FilterService } from '../services/filterserice';
import { State } from '../models/state.model';
@Component({
  selector: 'app-unitcategorylist',
  templateUrl: './unitcategorylist.component.html',
  styleUrls: ['./unitcategorylist.component.scss']
})
export class UnitcategorylistComponent implements OnInit {
  @Input() property: OwnerPropertyMasterIndiviualUnits[] = []
  // @Input() listingPurposeID!: number;
  @Input() landLordID!: number;
  // @Input() itemsPerPage!: number;
  // @Input() page!: number;
  // @Input() maxValue!: number;
  // @Input() minValue!: number;
  // @Input() unitsid!: number;
  // @Input() propertyMasterTypeID!: number;
  // @Input() governorateid!: number;
  // @Input() subTypeId!: number;
  @Input() sharedmodel=new State
  location = assetUrl("icons/location.svg");
  constructor(private router: Router, private filterservice: FilterService) { }
  ngOnInit(): void {
  }
  getstutus(stutuss: number) {
    return getstatusType(stutuss);
  }
  onclick(propertyMasterID: number, propertyUnitID: number, unitCategoryID: number, landLordID: number, propertySubTypeId: number) {
    let unitCategory = this.filterservice.getPropertytUnitCategoryid(unitCategoryID)
    let propertySubType = this.filterservice.getPropertytMasterSubTypeid(propertySubTypeId)
    debugger
    this.router.navigate(['propertyfulldisplay'],
      {
        queryParams: { 'unitCategory': unitCategory, 'PropertySubType': propertySubType, 'landlord': landLordID, 'propertyMaster': propertyMasterID, 'propertyUnit': propertyUnitID },
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
