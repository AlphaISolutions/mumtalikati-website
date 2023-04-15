import { Component, Input, OnInit } from '@angular/core';
import { propertyMasterTypeEnum } from '../models/enums';
import { OwnerPropertyMasterIndiviualUnits } from '../models/ownerPropertyMasterIndiviualUnits.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() indiviualsUni: OwnerPropertyMasterIndiviualUnits[] = [];
  @Input() propertyMasterTypeID!: number;
  @Input() unitcategoryid!: number;
  @Input() listingPurposeID!: number;
  @Input() propertyMasterID!: number;
  @Input() governorateid!: number;
  @Input() subTypeId!: number;
  constructor(private router: Router) { }
  ngOnInit(): void {
    console.log(this.subTypeId)
  }
  getenum(propertyMasterTypeID: number) {
    return propertyMasterTypeEnum(propertyMasterTypeID)
  }
  backtosearch() {
    debugger
    this.router.navigate(['propertydetails'],
      {
        state: { 'listingPurposeID': this.listingPurposeID, 'propertyMasterTypeID': this.propertyMasterTypeID, 'governorateid': this.governorateid, 'unitcategoryid': this.unitcategoryid, 'subTypeId':this.subTypeId }
      });
  }
}
