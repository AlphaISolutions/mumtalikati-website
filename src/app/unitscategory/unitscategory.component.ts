import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { assetUrl } from 'src/single-spa/asset-url';
import { getPropertySubTypeEnum, getPropertyUnitCategoryEnumstring, getPropertyUnitEnum, getstatusType, listingPurposeTypeEnumSting, listingPurposelang, propertyMasterTypeEnum } from '../models/enums';
import { OwnerPropertyMasterIndiviualUnits } from '../models/ownerPropertyMasterIndiviualUnits.model';
import { MumtalikatiService } from '../services/mumtalikati.service';
import { FilterService } from '../services/filterserice';
import { State } from '../models/state.model';
import { SetFiltersServive } from '../services/setfilters.servive';
import { time } from '@rxweb/reactive-form-validators';
import { environment } from '../../environments/environment.development'
import { TranslocoService } from '@ngneat/transloco';
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
  statedata: any
  enData: any = "https://d2og5lryw1ajtt.cloudfront.net/language/";
  arData: any = "https://d2og5lryw1ajtt.cloudfront.net/language/ar.json";
  constructor(private mumtalikatiservic: MumtalikatiService, private router: Router,
    private route: ActivatedRoute, private filterservice: FilterService, private localstorage: SetFiltersServive,private translocoService: TranslocoService) { this.getState(); }
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
    else {
      this.sharedmodel = undefined
    }

  }
  statedatalist() {
    if (this.sharedmodel == undefined) {
      this.sharedmodel = this.localstorage.getsharedmodel()!
    } else {
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

  }
  getlistPurpose(params: any) {
    this.propertyMasterID = +params['propertyMasterID'];
    this.listpurID =listingPurposeTypeEnumSting(params['purpose'])
    if (this.listpurID) {
      this.listingPurposeID = this.listpurID
      this.liststring = params['purpose']
    } else {
      this.liststring = params['purpose'];
    }
  }
  getUnitCategory(params: any) {
    this.unitcategoryId = getPropertyUnitCategoryEnumstring(params['unitCategory'])
    if (this.unitcategoryId) {
      this.unitCategoryID = this.unitcategoryId;
      this.unitcategorystring = params['unitCategory']
    }
    else {
      this.unitcategorystring = params['unitCategory']
      // this.unitcategorystring = this.getlang(localStorage.getItem('locale'))
    }
  }
  getlang(language: string) {
    var lang = {
      "en-US": "All",
      "ar": "الكل",
    }
    return lang[language] || "Unknown";
  }
  getpurpose(params: any) {
    var lang = {
      "Rent": "إيجار",
      "Buy": "يشتري",
      "يشتري": "Buy",
      "إيجار": "Rent"
    }
    return lang[params] || "Unknown";
  }
}
