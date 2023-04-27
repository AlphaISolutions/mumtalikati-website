import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getPropertyUnitCategoryEnum, listingPurposeTypeEnum, propertyMasterTypeEnum } from '../models/enums';
import { OwnerRentDetail } from '../models/ownerRentDetailmodel';

@Component({
  selector: 'app-breadcrumbpropertyfulldisplay',
  templateUrl: './breadcrumbpropertyfulldisplay.component.html',
  styleUrls: ['./breadcrumbpropertyfulldisplay.component.scss']
})
export class BreadcrumbpropertyfulldisplayComponent implements OnInit {
 @Input() propertyDetail: OwnerRentDetail[] = [];
 @Input() propertyMasterTypeID!: number;
 @Input()  unitcatID!: number;
 @Input() landlordid!: number;
 @Input() listpurID!:number;
 @Input () pmid!:number;
 @Input() statuss!:number;
 @Input() page!:number;
 @Input() perpagenumber!:number
  constructor(private router: Router) { }

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
getlist(listid:number){
return listingPurposeTypeEnum(listid)
}
getunit(unitid:number){
  return getPropertyUnitCategoryEnum(unitid)
}
}
