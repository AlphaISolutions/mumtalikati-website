import { Component, OnInit } from '@angular/core';
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
  unitCategoryID!: number;
  landLordID!: number;
  config: any;
  page = 1;
  perpagenumber:number=9
  passenger: any;
  itemsPerPage = 9;
  color ={'color':'black!important'};
  logocolor=false;
  public status:number=1
  propertyMasterTypeID!:number
  constructor(private mumtalikatiservic: MumtalikatiService, private route: ActivatedRoute, private router: Router) { }
  indiviualsUni: OwnerPropertyMasterIndiviualUnits[] = []
  IndiviualsUnitTotalCount: any;
  location = assetUrl("icons/location.svg");
  bydefault = assetUrl('img/bydefault.png');
  parentStyle = {'background-color':'black'};
  async ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.propertyMasterID = +params['propertyMasterID'];
      this.listingPurposeID = +params['listingPurposeID'];
      this.unitCategoryID = +params['unitCategoryID'];
      this.landLordID = +params['landLordID'];
      this.propertyMasterTypeID=+params['propertyMasterTypeID']
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
    this.loading = true;
    this.mumtalikatiservic.getPropertyMasterIndiviualsUnitTotalCount(propertyMasterTypeID, listingPurposesID, UnitCategoryID, status)
      .then((data) => {
        if (data) {
          this.IndiviualsUnitTotalCount = data;
        }
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
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

  onclick(propertyMasterID: number, propertyUnitID: number, unitCategoryID: number, landlordid: number,statuss:number) {
    this.router.navigate(['propertyfulldisplay'],
    {queryParams:{'propertyMasterID':propertyMasterID, 'propertyUnitID':propertyUnitID, 'unitCategoryID':unitCategoryID, 'landlordid':landlordid, 'statuss':statuss}});
  }
  getenum(propertyMasterTypeID:number){
    return propertyMasterTypeEnum(propertyMasterTypeID)
  }
  }
