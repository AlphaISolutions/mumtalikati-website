import { Component, Input, OnInit } from '@angular/core';
import { propertyMasterTypeEnum } from '../models/enums';
import { OwnerPropertyMasterIndiviualUnits } from '../models/ownerPropertyMasterIndiviualUnits.model';
import { Router } from '@angular/router';
import { SetupService } from '../services/setup.service';
import { Governorate } from '../models/governorate.model';
import { AnyFunction } from '@splidejs/splide';
import { FilterService } from '../services/filterserice';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() indiviualsUni: OwnerPropertyMasterIndiviualUnits[] = [];
  @Input() propertyMasterTypeID!: number;
  @Input() unitcategoryId!: number;
  @Input() listingPurposeID!: any;
  @Input() propertyMasterID!: number;
  @Input() governorateid!: number;
  @Input() subTypeId!: number;
  @Input() maxValue!: number;
  @Input() minValue!: number;
  @Input() unitsid!: number;
  subid: any;
  governorateName!: any
  constructor(private router: Router, private filterservice: FilterService) { }
  ngOnInit(): void {
  }
  getenum(propertyMasterTypeID: number) {
    return propertyMasterTypeEnum(propertyMasterTypeID)
  }
  backtosearch() {
    this.subid = this.filterservice.getPropertytMasterSubTypeid(this.subTypeId);
    this.router.navigate(['propertydetails'], {
      queryParams: {
        'purpose': this.filterservice.getPurposeid(this.listingPurposeID),
        'governorate': this.filterservice.getGovernorateid(this.governorateid),
        'propertyMasterType': this.filterservice.getPropertytMasterTypeid(this.propertyMasterTypeID),
        'propertyMasterSubType': this.subid,
        'unitCategory': this.filterservice.getPropertytUnitCategoryid(this.unitsid),
        'minValue': this.minValue,
        'maxValue': this.maxValue
      },

      state: {
        'purpose': this.listingPurposeID,
        'governorate': this.governorateid,
        'propertyMasterType': this.propertyMasterTypeID,
        'propertyMasterSubType': this.subTypeId, 'minValue': this.minValue,
        'maxValue': this.maxValue, 'unitCategory': this.unitsid
      }
    });
  }
}
