import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerRentDetail } from '../models/ownerRentDetailmodel';
import { PropertyFeature } from '../models/propertyfeature';
import { MumtalikatiService } from '../services/mumtalikati.service';
import { ProfileImage } from '../models/profileImage.model';
import { FilterService } from '../services/filterserice';
import { State } from '../models/state.model';
import { SetFiltersServive } from '../services/setfilters.servive';
import { Meta, Title } from '@angular/platform-browser';
import { getPropertySubTypeEnum, getPropertyUnitCategoryEnumstring } from '../models/enums';
@Component({
  selector: 'app-propertyfulldisplay',
  templateUrl: './propertyfulldisplay.component.html',
  styleUrls: ['./propertyfulldisplay.component.scss']
})
export class PropertyfulldisplayComponent implements OnInit {
  propertyFeature: PropertyFeature[] = [];
  propertyDetail: OwnerRentDetail;
  sharedmodel = new State;
  imageUser!: ProfileImage;
  propertyMasterSubType: number;
  propertyMasterTypeID: number;
  unitcategorydesc: string;
  propertysubdesc: string;
  listingPurposeID: number;
  propertyUnitid!: number;
  loading: boolean = false;
  governorateid: number;
  PropertySubTypeID: any;
  perpagenumber: number;
  pmid!: number;
  unitcatID!: number;
  landlordid!: number;
  logocolor = false;
  statuss: number;
  page: number;
  listpurID: any;
  unitCategory: any
  subTypeId: number;
  unitsid: number;
  minValue: number;
  maxValue: number
  areaid:number;
  btnColor = { 'background-color': '#9e2a2b' }
  maxheight = { 'maxheight': '80vh !important' }
  activeroutes = { 'color': '#9e2a2b !important', 'font-weight': '500' };
  parentStyle = { 'background-color': 'black' };
  color = { 'color': 'black!important' };

  constructor(
    private route: ActivatedRoute,
    private mumtalikatiservic: MumtalikatiService,
    private filterservice: FilterService,
    private router: Router,
    private SetFiltersServive: SetFiltersServive,
    private metaService: Meta,
    private titleService: Title
  ) {
    this.getState()
  }

  async ngOnInit() {
    this.inIt();
    this.getMeteTag();
    this.statedatalist()
  }

  inIt() {
    this.route.queryParams.subscribe(params => {
      this.pmid = +params['propertyMaster'];
      this.propertyUnitid = +params['propertyUnit'];
      this.unitCategory = getPropertyUnitCategoryEnumstring(this.unitcategorydesc = params['unitCategory'])
      this.unitcatID = this.unitCategory;
      this.PropertySubTypeID = getPropertySubTypeEnum(this.propertysubdesc = params["PropertySubType"])
      this.landlordid = +params['landlord'];
    });
    this.getPropertyDetails(this.landlordid, this.unitcatID, this.pmid, this.propertyUnitid);
    this.getPropertyFeatures(this.pmid);
    this.getImageUser(this.landlordid);
  }

  getPropertyDetails(landLordID: number, UnitCategoryID: number, PropertyMasterID: number, propertyUnitid: number) {
    this.loading = true;
    this.mumtalikatiservic.getPropertyUnitDetails(landLordID, UnitCategoryID, PropertyMasterID, propertyUnitid)
      .then((data) => {
        if (data) {
          this.propertyDetail = data[0];

        }
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
        console.error(error);
      });
  }

  getImageUser(landLordID: number) {
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

  getPropertyFeatures(id: number) {
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



  getState() {
    if (this.router.getCurrentNavigation()?.extras.state != undefined) {
      this.listingPurposeID = this.router.getCurrentNavigation()?.extras.state!["purpose"];
      this.governorateid = this.router.getCurrentNavigation()?.extras.state!["governorate"];
      this.propertyMasterTypeID = this.router.getCurrentNavigation()?.extras.state!["propertyMasterType"];
      this.subTypeId = this.router.getCurrentNavigation()?.extras.state!["propertyMasterSubType"];
      this.unitsid = this.router.getCurrentNavigation()?.extras.state!["unitCategory"]
      this.minValue = this.router.getCurrentNavigation()?.extras.state!["minValue"];
      this.maxValue = this.router.getCurrentNavigation()?.extras.state!["maxValue"]
      this.propertyMasterSubType = this.router.getCurrentNavigation()?.extras.state!["propertyMasterSubtype"];
      this.maxValue = this.router.getCurrentNavigation()?.extras.state!["maxValue"];
      this.areaid = this.router.getCurrentNavigation()?.extras.state!["area"]
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
    data.areaId=this.areaid
    this.SetFiltersServive.setsharedmodel(data);
  }

  getMeteTag() {
    if (this.listingPurposeID == 1) {
      var title = "Find Your Ideal Rental Property in Oman with Mumtalikati "
      this.titleService.setTitle(title);
      this.metaService.addTag({ id: "Rent", descrption: "Looking for a rental property in Oman? Mumtalikati has you covered. Explore our extensive listings and find your ideal home. Begin your search now." })
    } else {
      var title = "Buy Your Dream Property in Oman with Mumtalikati"
      this.titleService.setTitle(title);
      this.metaService.addTag({ id: "Buy", descrption: "Looking for a house to buy? Mumtalikati offers a diverse range of properties for sale in Oman. Browse through our listings and find a property that suits best." })
    }
  }

  getUnitCategory(language: string, params: any) {
    var lang = {
      "en-US": {
        "id": this.filterservice.getPropertytUnitCategorydesc(this.unitcategorydesc = params['unitCategory'])
      },
      "ar": {
        dese: this.filterservice.getPropertytUnitCategorydesc(this.unitcategorydesc = params['unitCategory'])
      },
    }
    return lang[language] || "Unknown";
  }

}

