import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { assetUrl } from 'src/single-spa/asset-url';
import { getstatusType, propertyMasterTypeEnum } from '../models/enums';
import { OwnerPropertyMasterIndiviualUnits } from '../models/ownerPropertyMasterIndiviualUnits.model';
import { MumtalikatiService } from '../services/mumtalikati.service';
import { FilterService } from '../services/filterserice';
import { State } from '../models/state.model';
import { SetFiltersServive } from '../services/setfilters.servive';
@Component({
  selector: 'app-unitscategory',
  templateUrl: './unitscategory.component.html',
  styleUrls: ['./unitscategory.component.scss']
})
export class UnitscategoryComponent implements OnInit {
  loading: boolean = false;
  propertyMasterID!: number;
  listingPurposeID!: number;
  unitCategoryID!: number;
  landLordID!: number;
  config: any;
  page = 1;
  perpagenumber: number = 9
  passenger: any;
  itemsPerPage = 9;
  color = { 'color': 'black!important' };
  logocolor = false;
  status: number = 1
  propertyMasterTypeID!: number
  subTypeId!: number | null;
  unitsid!: number;
  indiviualsUni: OwnerPropertyMasterIndiviualUnits[] = []
  IndiviualsUnitTotalCount: any;
  location = assetUrl("icons/location.svg");
  notfound = assetUrl('img/notfoundproperty.svg');
  parentStyle = { 'background-color': 'black' };
  step: any;
  governorateid!: number;
  maxValue!: number;
  minValue!: number;
  listid: any
  unitid: any
  listpurID: any;
  liststring!: string;
  unitcategoryId: any;
  unitcategorystring!: string
  btnColor = { 'background-color': '#9e2a2b' };
  activeroutes = { 'color': '#9e2a2b !important', 'font-weight': '500' };
  sharedmodel = new State;
  statedata:any
  constructor(private mumtalikatiservic: MumtalikatiService, private router: Router,
    private route: ActivatedRoute, private filterservice: FilterService) { this.getState(); }
  async ngOnInit() {
    this.InItQueryparams();
    this.statedatalist()
    this.config = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.page,
      totalItems: this.IndiviualsUnitTotalCount
    };
  }
  async propertyMasterIndiviualsUni(propertyMasterTypeID: number, listingPurposesID: number, UnitCategoryID: number, status: number, pageNumber: number, rowsNumbers: number) {
    this.loading = true;
    this.mumtalikatiservic.getPropertyMasterIndiviualsUnit(propertyMasterTypeID, listingPurposesID, UnitCategoryID, status, pageNumber, rowsNumbers)
      .then((data) => {
        if (data) {
          this.indiviualsUni = data;
        }
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
        console.error(error);
      });
  }
  async propertyMasterIndiviualsUniCount(propertyMasterTypeID: number, listingPurposesID: number, UnitCategoryID: number, status: number) {
    this.mumtalikatiservic.getPropertyMasterIndiviualsUnitTotalCount(propertyMasterTypeID, listingPurposesID, UnitCategoryID, status)
      .then((data) => {
        if (data) {
          this.IndiviualsUnitTotalCount = data;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  getstutus(stutuss: number) {
    return getstatusType(stutuss);
  }
  async pageChange(page: any) {
    this.loading = true;
    await this.propertyMasterIndiviualsUni(this.propertyMasterID, this.listingPurposeID, this.unitCategoryID, this.status, page, this.perpagenumber);
  }

  getenum(propertyMasterTypeID: number) {
    return propertyMasterTypeEnum(propertyMasterTypeID)
  }
  InItQueryparams() {
    this.route.queryParams.subscribe(params => {
      this.getlistPurpose(params)
      this.getUnitCategory(params)
    });
    this.propertyMasterIndiviualsUni(this.propertyMasterID, this.listingPurposeID, this.unitCategoryID, this.status, this.page, this.perpagenumber);
    this.propertyMasterIndiviualsUniCount(this.propertyMasterID, this.listingPurposeID, this.unitCategoryID, this.status);
  }
  getState() {
    if (this.router.getCurrentNavigation()?.extras.state != undefined) {
      this.listingPurposeID = this.router.getCurrentNavigation()?.extras.state!["purpose"];
      this.governorateid = this.router.getCurrentNavigation()?.extras.state!["governorate"];
      this.propertyMasterTypeID = this.router.getCurrentNavigation()?.extras.state!["propertyMasterType"];
      this.subTypeId = this.router.getCurrentNavigation()?.extras.state!["propertyMasterSubType"];
      this.unitsid = this.router.getCurrentNavigation()?.extras.state!["unitCategory"]
      this.minValue = this.router.getCurrentNavigation()?.extras.state!["minValue"];
      this.maxValue = this.router.getCurrentNavigation()?.extras.state!["maxValue"]
    }
    else{
      this.sharedmodel = undefined
    }

  }
  statedatalist() {
    let data = this.sharedmodel
    data.listingPurposesID = this.listingPurposeID;
    data.gOVERNORATEID = this.governorateid;
    data.propertyMasterTypeID = this.propertyMasterTypeID;
    data.propertyMasterSubTypeID = this.subTypeId;
    data.propertyCategory = this.unitsid;
    data.minPrice = this.minValue;
    data.maxPrice = this.maxValue;
    data.pageNumber = this.page;
    data.rowsNumbers = this.perpagenumber;
  }
  getlistPurpose(params: any) {
    this.propertyMasterID = +params['propertyMasterID'];
    this.listpurID = this.filterservice.getPurposedesc(params['purpose'])
    if (this.listpurID) {
      this.listingPurposeID = this.listpurID
      this.liststring = params['purpose']
    } else {
      const purposestring = this.filterservice.getPurposeid(1);
      this.liststring != purposestring;
    }
  }
  getUnitCategory(params: any) {
    this.unitcategoryId = this.filterservice.getPropertytUnitCategorydesc(params['unitCategory'])
    if (this.unitcategoryId) {
      this.unitCategoryID = this.unitcategoryId;
      this.unitcategorystring = params['unitCategory']
    }
    else {
      this.unitcategorystring = 'All'
    }
  }
}
