import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { propertyMasterTypeEnum } from '../models/enums';
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
  backotsearch() {
    debugger
    this.router.navigate(
      ['Unitscategory'],
      { queryParams: { 'propertyMasterID': this.pmid, 'purpose': this.listpurID, 'unitCategory': this.unitcatID, 'status': this.statuss, 'page': this.page, 'perpagenumber': this.perpagenumber, 'propertyMasterTypeID': this.propertyMasterTypeID, 'landLordID': this.landlordid } });
  }
}
