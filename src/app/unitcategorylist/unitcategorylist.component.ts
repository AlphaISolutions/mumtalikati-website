import { Component, Input, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { getstatusType } from '../models/enums';
import { OwnerPropertyMasterIndiviualUnits } from '../models/ownerPropertyMasterIndiviualUnits.model';
import { assetUrl } from 'src/single-spa/asset-url';

@Component({
  selector: 'app-unitcategorylist',
  templateUrl: './unitcategorylist.component.html',
  styleUrls: ['./unitcategorylist.component.scss']
})
export class UnitcategorylistComponent implements OnInit {
 @Input() property: OwnerPropertyMasterIndiviualUnits[] = []
 @Input()  listingPurposeID!: number;
 @Input()  landLordID!: number;
 @Input() itemsPerPage!:number;
 @Input() page!:number;
 location = assetUrl("icons/location.svg");
  constructor( private router: Router) { }
  ngOnInit(): void {
   
  }
  onclick(propertyMasterID: number, propertyUnitID: number, unitCategoryID: number, landLordID: number, statuss: number, propertySubTypeId: number, caption:string ) {

    if (propertySubTypeId == 15) {
      this.router.navigate(['plotdetails'],
        {
          queryParams: { 'propertyMasterID': propertyMasterID, 'propertyUnitID': propertyUnitID, 'unitCategoryID': unitCategoryID, 'landlordid': landLordID, 'status': statuss, 'listingPurposeID': this.listingPurposeID,'PropertySubTypeID': propertySubTypeId,'caption':caption ,'page':this.page,'itemsPerPage':this.itemsPerPage},
         
        });
    } else {
      this.router.navigate(['propertyfulldisplay'],
        {
          queryParams: { 'propertyMasterID': propertyMasterID, 'propertyUnitID': propertyUnitID, 'unitCategoryID': unitCategoryID, 'landlordid': landLordID, 'status': statuss,'listingPurposeID': this.listingPurposeID,'PropertySubTypeID': propertySubTypeId, 'caption':caption,'page':this.page,'itemsPerPage':this.itemsPerPage },
       
        });
    }

  }
  getstutus(stutuss: number) {
    return getstatusType(stutuss);
  }
}
