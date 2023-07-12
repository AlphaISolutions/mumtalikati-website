import { Component, Input, OnInit } from '@angular/core';
import { propertyMasterTypeEnum } from '../models/enums';
import { OwnerPropertyMasterIndiviualUnits } from '../models/ownerPropertyMasterIndiviualUnits.model';
import { Router } from '@angular/router';
import { SetupService } from '../services/setup.service';
import { Governorate } from '../models/governorate.model';
import { AnyFunction } from '@splidejs/splide';
import { FilterService } from '../services/filterserice';
import { State } from '../models/state.model';
import { SetFiltersServive } from '../services/setfilters.servive';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() indiviualsUni: OwnerPropertyMasterIndiviualUnits[] = [];
  @Input() propertyMasterTypeID!: number;
  @Input() sharedmodel = new State
  subid: any;
  governorateName!: any
  constructor(private router: Router, private filterservice: FilterService, private localstorage: SetFiltersServive) { }
  ngOnInit(): void {
  }
  getenum(propertyMasterTypeID: number) {
    // return propertyMasterTypeEnum(propertyMasterTypeID)
    return this.filterservice.getPropertytMasterTypeid(propertyMasterTypeID)
  }
  getsubtypeID(id: number) {
    return this.filterservice.getPropertytMasterSubTypeid(id)
  }
  getUnitcatID(id: number) {
    return this.filterservice.getPropertytUnitCategoryid(id)
  }
  backtosearch() {
    debugger
    if (this.sharedmodel == undefined) {
      this.sharedmodel = this.localstorage.getsharedmodel()!
      this.subid = this.filterservice.getPropertytMasterSubTypeid(this.sharedmodel.propertyMasterSubTypeID!);
      this.router.navigate(['propertydetails'], {
        queryParams: {
          'purpose': this.filterservice.getPurposeid(this.sharedmodel.listingPurposesID!),
          'governorate': this.filterservice.getGovernorateid(this.sharedmodel.gOVERNORATEID!),
          'propertyMasterType': this.filterservice.getPropertytMasterTypeid(this.sharedmodel.propertyMasterTypeID!),
          'propertyMasterSubType': this.subid,
          'unitCategory': this.filterservice.getPropertytUnitCategoryid(this.sharedmodel.propertyCategory!),
          'minValue': this.sharedmodel.minPrice,
          'maxValue': this.sharedmodel.maxPrice
        }
      });
    } else {
      this.subid = this.filterservice.getPropertytMasterSubTypeid(this.sharedmodel.propertyMasterSubTypeID!);
      this.router.navigate(['propertydetails'], {
        queryParams: {
          'purpose': this.filterservice.getPurposeid(this.sharedmodel.listingPurposesID!),
          'governorate': this.filterservice.getGovernorateid(this.sharedmodel.gOVERNORATEID!),
          'propertyMasterType': this.filterservice.getPropertytMasterTypeid(this.sharedmodel.propertyMasterTypeID!),
          'propertyMasterSubType': this.subid,
          'unitCategory': this.filterservice.getPropertytUnitCategoryid(this.sharedmodel.propertyCategory!),
          'minValue': this.sharedmodel.minPrice,
          'maxValue': this.sharedmodel.maxPrice
        }
      });
    }

  }
}
