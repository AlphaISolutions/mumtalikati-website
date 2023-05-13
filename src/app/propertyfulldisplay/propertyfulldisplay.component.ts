import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { assetUrl } from 'src/single-spa/asset-url';
import { OwnerRentDetail } from '../models/ownerRentDetailmodel';
import { PropertyFeature } from '../models/propertyfeature';
import { MumtalikatiService } from '../services/mumtalikati.service';
import { ProfileImage } from '../models/profileImage.model';
import { FilterService } from '../services/filterserice';
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
  phoneicon = assetUrl("icons/phoneicon.png");
  copyIcon = assetUrl("icons/copyicon.png");
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
  public page!: number;
  public perpagenumber!: number;
  contact!: any;
  listpurID!: any;
  PropertySubTypeID!: any;
  caption!: string;
  propertyMasterTypeID!: number;
  btnColor = { 'background-color': '#9e2a2b' }
  closeResult = '';
  maxheight = { 'maxheight': '80vh !important' }
  activeroutes = { 'color': '#9e2a2b !important', 'font-weight': '500' };
  public imgindex: number = 0;
  unitCategory!: any
  unitcategorydesc!: string;
  propertysubdesc!: string;
  wholeBuildingdes!: string;
  listingPurposeID!: number;
  governorateid!: number;
  subTypeId!: number;
  unitsid!: number;
  minValue!: number;
  maxValue!: number
  wholeBuildinglist!: any;
  propertyMasterSubType!: number

  constructor(private route: ActivatedRoute, private mumtalikatiservic: MumtalikatiService, private filterservice: FilterService, private router: Router,) {
    if (this.router.getCurrentNavigation()?.extras.state != undefined) {

      debugger
      this.listingPurposeID = this.router.getCurrentNavigation()?.extras.state!["purpose"];
      this.governorateid = this.router.getCurrentNavigation()?.extras.state!["governorate"];
      this.propertyMasterTypeID = this.router.getCurrentNavigation()?.extras.state!["propertyMasterType"];
      this.subTypeId = this.router.getCurrentNavigation()?.extras.state!["propertyMasterSubType"];
      this.unitsid = this.router.getCurrentNavigation()?.extras.state!["unitCategory"]
      this.minValue = this.router.getCurrentNavigation()?.extras.state!["minValue"];
      this.maxValue = this.router.getCurrentNavigation()?.extras.state!["maxValue"]
      this.propertyMasterSubType = this.router.getCurrentNavigation()?.extras.state!["propertyMasterSubtype"]
    }
  }
  async ngOnInit() {
    this.inIt();
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
    this.mumtalikatiservic.getUserImage(landLordID)
      .then((data) => {
        if (data) {
          this.imageUser = data;
        }

      })
      .catch((error) => {
        this.loading = false;
        console.error(error);
      });
  }
  async getPropertyFeatures(id: number) {
    this.mumtalikatiservic.getPropertyFeature(id)
      .then((data) => {
        if (data) {
          this.propertyFeature = data.filter(x => x.propertyUnitCategoryID == this.unitcatID
          )
        }

      })
      .catch((error) => {
        this.loading = false;
        console.error(error);
      });
  }
  inIt() {
    this.route.queryParams.subscribe(params => {
      this.pmid = +params['propertyMaster'];
      this.propertyUnitid = +params['propertyUnit'];
      this.unitCategory = this.filterservice.getPropertytUnitCategorydesc(this.unitcategorydesc = params['unitCategory'])
      this.unitcatID = this.unitCategory;
      this.PropertySubTypeID = this.filterservice.getPropertytMasterSubTypedesc(this.propertysubdesc = params["PropertySubType"])
      this.landlordid = +params['landlord'];
      this.getPropertyDetails(this.landlordid, this.unitcatID, this.pmid, this.propertyUnitid);
      this.getPropertyFeatures(this.pmid);
      this.getImageUser(this.landlordid);

    });
  }
}

