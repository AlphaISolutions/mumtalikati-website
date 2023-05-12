import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getstatusType } from '../models/enums';
import { OwnerPropertyMasterIndiviualUnits } from '../models/ownerPropertyMasterIndiviualUnits.model';
import { assetUrl } from 'src/single-spa/asset-url';
import { FilterService } from '../services/filterserice';

@Component({
  selector: 'app-unitcategorylist',
  templateUrl: './unitcategorylist.component.html',
  styleUrls: ['./unitcategorylist.component.scss']
})
export class UnitcategorylistComponent implements OnInit {
  @Input() property: OwnerPropertyMasterIndiviualUnits[] = []
  @Input() listingPurposeID!: number;
  @Input() landLordID!: number;
  @Input() itemsPerPage!: number;
  @Input() page!: number;
  @Input() maxValue!: number;
  @Input() minValue!: number;
  @Input() unitsid!: number;
  @Input() propertyMasterTypeID!: number;
  @Input() governorateid!: number;
  @Input() subTypeId!: number;



  location = assetUrl("icons/location.svg");
  constructor(private router: Router, private filterservice: FilterService) { }
  ngOnInit(): void {

  }
  onclick(propertyMasterID: number, propertyUnitID: number, unitCategoryID: number, landLordID: number, propertySubTypeId: number) {
    let unitCategory = this.filterservice.getPropertytUnitCategoryid(unitCategoryID)
    let propertySubType = this.filterservice.getPropertytMasterSubTypeid(propertySubTypeId)
    if (propertySubTypeId == 15) {
      this.router.navigate(['plotdetails'],
        {
          queryParams: { 'unitCategory': unitCategory, 'landlordid': landLordID, 'propertyMasterID': propertyMasterID, 'propertyUnitID': propertyUnitID, },
          state:{
            'purpose': this.listingPurposeID,
            'governorate': this.governorateid,
            'propertyMasterType': this.propertyMasterTypeID,
            'propertyMasterSubType': this.subTypeId, 'minValue': this.minValue,
            'maxValue': this.maxValue, 'unitCategory': this.unitsid
      }
        });
  } else {
  this.router.navigate(['propertyfulldisplay'],
    {
      queryParams: { 'unitCategory': unitCategory, 'PropertySubType': propertySubType, 'landlord': landLordID, 'propertyMaster': propertyMasterID, 'propertyUnit': propertyUnitID },
      state:{
        'purpose': this.listingPurposeID,
        'governorate': this.governorateid,
        'propertyMasterType': this.propertyMasterTypeID,
        'propertyMasterSubType': this.subTypeId, 'minValue': this.minValue,
        'maxValue': this.maxValue, 'unitCategory': this.unitsid
  }
    });
}

  }
getstutus(stutuss: number) {
  return getstatusType(stutuss);
}
}
