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
  location = assetUrl("icons/location.svg");
  constructor(private router: Router, private filterservice: FilterService) { }
  ngOnInit(): void {

  }
  onclick(propertyMasterID: number, propertyUnitID: number, unitCategoryID: number, landLordID: number, propertySubTypeId: number) {
  let unitCategory  =this.filterservice.getPropertytUnitCategoryid(unitCategoryID)
  let propertySubType =this.filterservice.getPropertytMasterSubTypeid(propertySubTypeId)
    if (propertySubTypeId == 15) {
      this.router.navigate(['plotdetails'],
        {
          queryParams: { 'propertyMasterID': propertyMasterID, 'propertyUnitID': propertyUnitID, 'unitCategory': unitCategory, 'landlordid': landLordID },

        });
    } else {
      this.router.navigate(['propertyfulldisplay'],
        {
          queryParams: { 'propertyMaster': propertyMasterID, 'propertyUnit': propertyUnitID, 'unitCategory': unitCategory, 'landlord': landLordID, 'PropertySubType': propertySubType?.desc },

        });
    }

  }
  getstutus(stutuss: number) {
    return getstatusType(stutuss);
  }
}
