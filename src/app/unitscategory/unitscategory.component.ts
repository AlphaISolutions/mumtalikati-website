import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { assetUrl } from 'src/single-spa/asset-url';
import { getstatusType, propertyMasterTypeEnum, Status } from '../models/enums';
import { OwnerPropertyMasterIndiviualUnits } from '../models/ownerPropertyMasterIndiviualUnits.model';
import { MumtalikatiService } from '../services/mumtalikati.service';
@Component({
  selector: 'app-unitscategory',
  templateUrl: './unitscategory.component.html',
  styleUrls: ['./unitscategory.component.scss']
})
export class UnitscategoryComponent implements OnInit {
  loading: boolean = false;
  propertyMasterID!: number;
  listingPurposeID!: number;
  public myId: number = 123;
  unitCategoryID!: number;
  landLordID!: number;
  config: any;
  page = 1;
  perpagenumber: number = 9
  passenger: any;
  itemsPerPage = 9;
  color = { 'color': 'black!important' };
  logocolor = false;
  public status: number = 1
  propertyMasterTypeID!: number
  public subTypeId!: number| null;
  btnColor = { 'background-color': '#9e2a2b' };
  activeroutes = { 'color': '#9e2a2b !important', 'font-weight': '500' };
  constructor(private mumtalikatiservic: MumtalikatiService, private route: ActivatedRoute, private router: Router) { }
  indiviualsUni: OwnerPropertyMasterIndiviualUnits[] = []
  IndiviualsUnitTotalCount: any;
  location = assetUrl("icons/location.svg");
  bydefault = assetUrl('img/bydefault.png');
  notfound = assetUrl('img/notfoundproperty.svg');
  parentStyle = { 'background-color': 'black' };
  step: any;
  governorateid!:number;
  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.propertyMasterID = +params['propertyMasterID'];
      this.listingPurposeID = +params['listingPurposeID'];
      this.unitCategoryID = +params['unitCategoryID'];
      this.landLordID = +params['landLordID'];
      this.propertyMasterTypeID = +params['propertyMasterTypeID'];
      this.governorateid = +params['governorateid'];
      this.subTypeId = +params['propertySubTypeid']
      this.propertyMasterIndiviualsUni(this.propertyMasterID, this.listingPurposeID, this.unitCategoryID, this.status, this.page, this.perpagenumber);
      this.propertyMasterIndiviualsUniCount(this.propertyMasterID, this.listingPurposeID, this.unitCategoryID, this.status);
    });
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
          debugger
          this.indiviualsUni = data;  
          // this.subTypeId=this.indiviualsUni[0].propertySubTypeId  
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
  backtosearch(){
    this.router.navigate(['propertydetails'],
    {
      state: { 'listingPurposeID': this.listingPurposeID, 'propertyMasterTypeID': this.propertyMasterTypeID}
    });
  }
}
