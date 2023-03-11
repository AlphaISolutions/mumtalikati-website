import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { assetUrl } from 'src/single-spa/asset-url';
import { OwnerRentDetail } from '../models/ownerRentDetailmodel';
import { PropertyFeature } from '../models/propertyfeature';
import { MumtalikatiService } from '../services/mumtalikati.service';
import { getPropertyUnitCategoryEnum, getstatusType, propertyMasterTypeEnum } from '../models/enums';
import { ProfileImage } from '../models/profileImage.model';
import { map } from 'rxjs';
@Component({
  selector: 'app-propertyfulldisplay',
  templateUrl: './propertyfulldisplay.component.html',
  styleUrls: ['./propertyfulldisplay.component.scss']
})
export class PropertyfulldisplayComponent implements OnInit {
  pmid!: number;
  propertyUnitid!: number;
  unitcatID!: number;
  landlordid!: number;
  loading: boolean = false;
  propertyDetail: OwnerRentDetail[] = [];
  location = assetUrl("icons/location.svg");
  areaimg = assetUrl("icons/Area.svg");
  bedroomimg = assetUrl("icons/Bedroom.svg");
  washroomimg = assetUrl("icons/Washroom.svg");
  kitchen = assetUrl("icons/kitchen.png");
  hall = assetUrl("icons/hall.png");
  favoriteicon = assetUrl("icons/favoriteicon.png");
  bydefault = assetUrl('img/bydefault.png');
  defaultperfile: string = 'https://p.kindpng.com/picc/s/24-248729_stockvader-predicted-adig-user-profile-image-png-transparent.png';
  parentStyle = { 'background-color': 'black' };
  color = { 'color': 'black!important' };
  logocolor = false;
  propertyFeature: PropertyFeature[] = []
  myModel = true;
  statuss!: number;
  imageUser!: ProfileImage;
  public page: number = 1;
  public perpagenumber: number = 8;
  listpurID!: any;
  pMTID!: number;
  btnColor={'background-color':'#9e2a2b'}
  constructor(private route: ActivatedRoute, private mumtalikatiservic: MumtalikatiService, private router: Router) {
    this.listpurID = this.router.getCurrentNavigation()!.extras.state!["listingPurposeID"]!;

  }
  async ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.pmid = +params['propertyMasterID'];
      this.propertyUnitid = +params['propertyUnitID'];
      this.unitcatID = +params['unitCategoryID'];
      this.landlordid = +params['landlordid'];
      this.statuss = +params['statuss'];
      // this.listpurID = +params['listingPurposeID']
      this.getPropertyDetails(this.landlordid, this.unitcatID, this.pmid, this.propertyUnitid);
      this.getPropertyFeatures(this.pmid);
      this.getImageUser(this.landlordid);
    });

  }
  async getPropertyDetails(landLordID: number, UnitCategoryID: number, PropertyMasterID: number, propertyUnitid: number) {
    this.loading = true;
    this.mumtalikatiservic.getPropertyUnitDetails(landLordID, UnitCategoryID, PropertyMasterID, propertyUnitid)
      .then((data) => {
        if (data) {
          this.propertyDetail = data;
        }
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
        console.error(error);
      });
  }
  async getImageUser(landLordID: number) {
    this.loading = true;
    this.mumtalikatiservic.getUserImage(landLordID)
      .then((data) => {
        if (data) {
          this.imageUser = data;
        }
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
        console.error(error);
      });
  }
  async getPropertyFeatures(id: number) {
    this.loading = true;
    this.mumtalikatiservic.getPropertyFeature(id)
      .then((data) => {
        if (data) {
          this.propertyFeature = data;
        }
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
        console.error(error);
      });
  }
  getenum(propertyMasterTypeID: number) {
    let pmtid = propertyMasterTypeID;
    this.pMTID=pmtid 
    return propertyMasterTypeEnum(propertyMasterTypeID)
  }
  getstatus(statuss: number) {
    return getstatusType(statuss)
  }
  getpropertyunitCategoryid(unitcatID: number) {
    return getPropertyUnitCategoryEnum(unitcatID)
  }
  addItem(newItem: number) {
    this.listpurID.push(newItem);
    console.log(newItem)
  }
  backotsearch() {
    this.router.navigate(
      ['Unitscategory'],
      { queryParams: { 'propertyMasterID': this.pmid, 'listingPurposeID': this.listpurID, 'unitCategoryID': this.unitcatID, 'status': this.statuss, 'page': this.page, 'perpagenumber': this.perpagenumber,'propertyMasterTypeID':this.pMTID,'landLordID':this.landlordid } });
  }
}

