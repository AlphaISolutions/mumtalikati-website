import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getPropertySubTypeEnumID, getPropertyUnitCategoryEnum } from '../models/enums';
import { OwnerPropertyMasterIndiviualUnits } from '../models/ownerPropertyMasterIndiviualUnits.model';
import { assetUrl } from 'src/single-spa/asset-url';
import { FilterService } from '../services/filterserice';
import { State } from '../models/state.model';
import { SetFiltersServive } from '../services/setfilters.servive';
@Component({
  selector: 'app-unitcategorylist',
  templateUrl: './unitcategorylist.component.html',
  styleUrls: ['./unitcategorylist.component.scss']
})
export class UnitcategorylistComponent implements OnInit {
  @Input() property: OwnerPropertyMasterIndiviualUnits[] = []
  @Input() landLordID!: number;
  @Input() sharedmodel = new State
  bydefault = assetUrl('img/bydefault.png');
  location = assetUrl("icons/location.svg");
  constructor(private router: Router, private filterservice: FilterService, private localstorage: SetFiltersServive) { }
  ngOnInit(): void {
  }
  getpropertySubType(id:number) {
    return this.filterservice.getPropertytMasterSubTypeid(id);
  }
  getstutus(stutuss: number) {
    return this.filterservice.getStatusbyID(stutuss);
  }

  onclick(propertyMasterID: number, propertyUnitID: number, unitCategoryID: number, landLordID: number, propertySubTypeId: number) {
    let unitCategory = getPropertyUnitCategoryEnum(unitCategoryID)
    let propertySubType = getPropertySubTypeEnumID(propertySubTypeId)
    if (this.sharedmodel == undefined) {
      
      this.sharedmodel = this.localstorage.getsharedmodel()!
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
            'maxValue': this.sharedmodel.maxPrice,
            'area':this.sharedmodel.areaId,
          }
        });
    } else {
      
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
            'maxValue': this.sharedmodel.maxPrice,
            'area':this.sharedmodel.areaId,
          }
        });
    }

  }
}


