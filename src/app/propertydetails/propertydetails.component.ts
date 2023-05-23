import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingPurpose } from '../models/listing-purpose.model';
import { PropertyMasterType } from '../models/property-master-type.model';
import { PropertyUnitCategory } from '../models/propertyUnitCategory.model';
import { RentalUnitDetail } from '../models/rental-unit-detail.model';
import { MumtalikatiService } from '../services/mumtalikati.service';
import { SetupService } from '../services/setup.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { listingPurposeTypeEnum, propertyMasterTypeEnum, propertySubTypeEnum } from '../models/enums';
import { PropertyMasterSubType } from '../models/propertyMasterSubType .model';
import { OwnerPropertyFilter, PropertyFilter } from '../models/PropertyFilter.model';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { Governorate } from '../models/governorate.model';
import { SetFiltersServive } from '../services/setfilters.servive';
import { Options } from "@angular-slider/ngx-slider";
import { FilterService } from '../services/filterserice';
import { State } from '../models/state.model';
import { Meta, Title } from '@angular/platform-browser';



@Component({
  selector: 'app-propertydetails',
  templateUrl: './propertydetails.component.html',
  styleUrls: ['./propertydetails.component.scss']
})
export class PropertydetailsComponent implements OnInit {
  loading: boolean = false;
  propertyDetail: RentalUnitDetail[] = [];
  listingpupose: ListingPurpose[] = [];
  propertymasterType: PropertyMasterType[] = []
  propertysubType: PropertyMasterSubType[] = []
  propertyUnitCategoryType: PropertyUnitCategory[] = [];
  propertyfilter = new PropertyFilter();
  ownerPropertyFilter: OwnerPropertyFilter[] = []
  page = 1;
  itemsPerPage: number = 8;
  listid: number = 1;
  unitcategoryid: number | null = null;
  selectedTab: number = 0;
  closeResult = '';
  configs: any
  propertyMasterTypeId: number = 1;
  mastertypeid: number | null = null;
  subTypeId!: number | null;
  perpagenumber = 8;
  color = { 'color': 'black!important' };
  logocolor: boolean = false;
  propertyFilterform!: FormGroup;
  filterCount: any;
  coler = { ' background-color': 'red' }
  hovercolor = { ' background-color': 'red' }
  governorateid: number | null = null;
  btnColor = { 'background-color': '#9e2a2b' };
  togglericon = { 'color': '#fffff !important' }
  activeroutes = { 'color': '#9e2a2b !important', 'font-weight': '500' };
  id: number | null = null;
  governorate: Governorate[] = [];
  minValue: number = 0;
  maxValue: number = 10000;
  listdesc: any;
  governoratname: any
  governoratcountryid: any;
  propertyMasterTypedesc: any;
  propertySubTypedesc: any;
  unitcategorydesc: any;
  unitcategoryId: any;
  propertyMasterTypeID: any;
  propertyMasterSubTypeID: any;
  allselection: string = 'All'
  governoratestring: string | null = "All";
  liststring!: string;
  unitcategorystring!: string;
  propertyMasterTypestring!: string
  propertyMasterSubTypeIDstring!: string
  minValuestate!: number;
  maxValuestate!: number;
  listpurID: any
  sharedmodel = new State;
  options: Options = {
    floor: 0,
    ceil: 10000,
    noSwitching: true
  }
  constructor(private route: ActivatedRoute,
    private rxFormBuilder: RxFormBuilder,
    private mumtalikatiservic: MumtalikatiService,
    private setservice: SetupService,
    private router: Router,
    private modalService: NgbModal,
    private setupFilterServive: SetFiltersServive,
    private filterservice: FilterService,
    private metaService: Meta,
    private titleService: Title) { this.getstate() }
  async ngOnInit() {
    this.inIt();
    this.queryParams();
    this.configs = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard: true,
      centered: true,
      scrollable: true,
    };
    this.statedatalist()
  }
  async initiaalizefilters() {
    this.listingpupose = await this.setupFilterServive.getListingPurpose();
    if (!this.listingpupose) {

      this.setservice.getlistingpurposeset().then((data) => {
        this.listingpupose = data;
        this.setupFilterServive.setListingPurpose(data)
      }).catch((error) => {
        console.error(error);
      }
      );
    }
    this.governorate = await this.setupFilterServive.getGovernorate();
    if (!this.governorate) {
      this.getgovernorates();
    }
    this.propertyUnitCategoryType = await this.setupFilterServive.getUnitCategory();
    if (!this.propertyUnitCategoryType) {
      this.getPropertyUnitCategoryType();
    }
    this.propertysubType = await this.setupFilterServive.getPropertySubType();
    if (!this.propertysubType) {
      this.setservice.getPropertySubTypes().then((data) => {
        this.propertysubType = data;
        this.setupFilterServive.setPropertySubType(data);
      }).catch((error) => {
        console.error(error);
      }
      );
    }
  }
  async getlistingPurpose() {
    this.setservice.getlistingpurposeset()
      .then((data) => {
        if (data) {
          this.listingpupose = data
        }
      })
      .catch((error) => {

        console.error(error);
      });
  }
  async getPropertyMasterType() {
    this.setservice.getPropertyMasterTypes()
      .then((data) => {
        if (data) {
          this.propertymasterType = data
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async getPropertySubType() {
    this.setservice.getPropertySubTypes()
      .then((data) => {
        if (data) {
          this.propertysubType = data
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async getPropertyUnitCategoryType() {
    this.setservice.getPropertyUnitCategoryTypes()
      .then((data) => {
        if (data) {
          this.propertyUnitCategoryType = data;
          this.setupFilterServive.setUnitCategory(data)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async postPropertyFilter_Count(data: PropertyFilter) {
    this.loading = true;
    this.mumtalikatiservic.postPropertyFilter_Count(data)
      .then((data) => {
        this.filterCount = data;
      })
      .catch((error) => {
        this.loading = false;
        console.error(error);
      });
  }
  propertyFilter(data: any) {
    this.loading = true;
    this.mumtalikatiservic.postPropertyFilter(data)
      .then((data) => {
        if (data) {
          this.ownerPropertyFilter = data
        }
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
        console.error(error);
      });
  }
  async getgovernorates() {
    this.loading = true;
    this.setservice.getGovernorate()
      .then((data) => {
        if (data) {
          this.governorate = data
          this.setupFilterServive.setGovernorate(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async pageChange(page: any) {
    this.loading = true;
    let data = this.propertyFilterform.value as PropertyFilter;
    data.rowsNumbers = this.perpagenumber;
    data.pageNumber = page;
    await this.propertyFilter(data)
  }

  getsubType(subTypeId: number) {
    return propertySubTypeEnum(subTypeId);
  }

  governorateId() {
    this.governorateid = null;
    this.statedatalist()
  }
  getlistpurpose(listid: number) {
    return listingPurposeTypeEnum(listid);
  }
  getpropertyMasterType(masterTypeId: number) {
    return propertyMasterTypeEnum(masterTypeId)
  }
  async onclicks(listingPurposeType: number) {
    this.listid = listingPurposeType;
  }
  onChangeListPurpose(event: any) {
    if (event && this.listid != event.value) {
      this.listid = event.value;
      let data = this.propertyFilterform.value as PropertyFilter;
      data.listingPurposesID = this.listid;
      data.rowsNumbers = this.perpagenumber;
      data.pageNumber = this.page;
      this.listdesc = this.filterservice.getPurposeid(this.listid)
      this.liststring = this.listdesc
      this.getpurposeMetatag()
      this.queryParams()
      this.propertyFilter(data)
      this.postPropertyFilter_Count(data)
      this.statedatalist()
    }
  }
  onChangeGovernorate(event: any) {
    if (event.value == 0) {
      event.value = null;
    }
    if (event && this.governorateid != event.value) {
      this.governorateid = event.value;
      let data = this.propertyFilterform.value as PropertyFilter;
      data.gOVERNORATEID = event.value;
      this.governoratname = this.filterservice.getGovernorateid(event.value)
      this.governoratestring = this.governoratname
      this.queryParams()
      this.propertyFilter(data)
      this.postPropertyFilter_Count(data)
      this.statedatalist()
    }
  }
  onpopupclose() {
    let data = this.propertyFilterform.value as PropertyFilter;
    data.maxPrice = this.maxValue;
    data.minPrice = this.minValue
    this.queryParams()
    this.propertyFilter(data)
    this.postPropertyFilter_Count(data)
    this.statedatalist()
    this.modalService.dismissAll();
  }
  onclickunitid(unitCategory: number) {
    this.unitcategoryid = unitCategory;
  }
  async matTab(masterType: number) {
    this.mastertypeid = masterType;
    this.propertyMasterTypeId = this.mastertypeid;
  }
  getPropertyUnitCategory(id: any, listid: any) {
    if (this.subTypeId == 15) {
      return this.unitcategoryid = null;
    } else {
      switch (id) {
        case 1:
          {
            let residentiallist = this.propertyUnitCategoryType.filter(x => x.unitCategory === 1 || x.unitCategory === 2
              || x.unitCategory === 3 || x.unitCategory === 4 || x.unitCategory === 5)
            return residentiallist;
          }
        case 2: {
          let commercialList = this.propertyUnitCategoryType.filter(x => x.unitCategory === 6 || x.unitCategory === 7
            || x.unitCategory === 8)
          return commercialList;
        }
        case 3: {
          if (listid == 1) {
            let residentialcommercialList = this.propertyUnitCategoryType.filter(x => x.unitCategory === 1 || x.unitCategory === 2
              || x.unitCategory === 3 || x.unitCategory === 4 || x.unitCategory === 5 || x.unitCategory == 6 || x.unitCategory == 7 || x.unitCategory == 8)
            return residentialcommercialList;
          }
          else {
            let residentialcommercialList = this.propertyUnitCategoryType.filter(x => x.unitCategory === 1 || x.unitCategory === 2
              || x.unitCategory === 3 || x.unitCategory === 4 || x.unitCategory === 5 || x.unitCategory == 6 || x.unitCategory == 7 || x.unitCategory == 8 || x.unitCategory == 12)
            return residentialcommercialList;
          }

        }
        default:
          if (listid == 1) {
            let residentialcommercialList = this.propertyUnitCategoryType.filter(x => x.unitCategory === 1 || x.unitCategory === 2
              || x.unitCategory === 3 || x.unitCategory === 4 || x.unitCategory === 5 || x.unitCategory == 6 || x.unitCategory == 7 || x.unitCategory == 8)
            return residentialcommercialList;
          }
          else {
            let residentialcommercialList = this.propertyUnitCategoryType.filter(x => x.unitCategory === 1 || x.unitCategory === 2
              || x.unitCategory === 3 || x.unitCategory === 4 || x.unitCategory === 5 || x.unitCategory == 6 || x.unitCategory == 7 || x.unitCategory == 8 || x.unitCategory == 12)
            return residentialcommercialList;
          }
      }
    }
  }
  allCheck() {
    this.unitcategoryid = null;
    this.unitcategorydesc = this.filterservice.getPropertytUnitCategoryid(this.unitcategoryid!)
    this.unitcategorystring = this.unitcategorydesc
    this.queryParams()
    let data = this.propertyFilterform.value as PropertyFilter;
    data.propertyCategory = this.unitcategoryid;
    this.propertyFilter(data)
    this.postPropertyFilter_Count(data)
    this.statedatalist()
  }
  open(content: any) {
    this.modalService.open(content, this.configs).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }
  openprice(price: any) {
    this.modalService.open(price, this.configs).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }
  openArea(area: any) {
    this.modalService.open(area, this.configs).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  filterFunction(propertymastertypeid: any, listid: any): any {
    switch (propertymastertypeid) {
      case 1: {
        if (listid == 1) {
          let data = this.propertysubType.filter(buttom => buttom.propertyMasterTypeID == propertymastertypeid && (buttom.propertySubTypeID == 1 || buttom.propertySubTypeID == 2 || buttom.propertySubTypeID == 3 || buttom.propertySubTypeID == 4 || buttom.propertySubTypeID == 5 || buttom.propertySubTypeID == 6 || buttom.propertySubTypeID == 7 || buttom.propertySubTypeID == 8));
          return data;
        } else {
          let data = this.propertysubType.filter(buttom => buttom.propertyMasterTypeID == propertymastertypeid && (buttom.propertySubTypeID == 1 || buttom.propertySubTypeID == 2 || buttom.propertySubTypeID == 5 || buttom.propertySubTypeID == 6 || buttom.propertySubTypeID == 8 || buttom.propertySubTypeID == 15));
          return data;
        }
      }
      case 2: {
        if (listid == 1) {
          let data = this.propertysubType.filter(buttom => buttom.propertyMasterTypeID == propertymastertypeid && (buttom.propertySubTypeID == 9 || buttom.propertySubTypeID == 10 || buttom.propertySubTypeID == 11 || buttom.propertySubTypeID == 12 || buttom.propertySubTypeID == 13 || buttom.propertySubTypeID == 14));
          return data;
        } else {
          let data = this.propertysubType.filter(buttom => buttom.propertyMasterTypeID == propertymastertypeid && (buttom.propertySubTypeID == 9 || buttom.propertySubTypeID == 10 || buttom.propertySubTypeID == 11 || buttom.propertySubTypeID == 12 || buttom.propertySubTypeID == 13 || buttom.propertySubTypeID == 14 || buttom.propertySubTypeID == 15));
          return data;
        }
      }
      case 3: {
        return this.propertysubType.filter(buttom => buttom.propertyMasterTypeID == propertymastertypeid);
      }
      default: {
        break;
      }
    }
  }
  onUnitcategory(unitcategory: number) {
    this.unitcategoryid = unitcategory
    let data = this.propertyFilterform.value as PropertyFilter;
    this.unitcategorydesc = this.filterservice.getPropertytUnitCategoryid(this.unitcategoryid!)
    this.unitcategorystring = this.unitcategorydesc
    this.getUnitMT(this.unitcategoryid);
    this.queryParams()
    data.propertyCategory = this.unitcategoryid;
    this.propertyFilter(data)
    this.postPropertyFilter_Count(data)
    this.statedatalist()
  }
  onsubtypeid(subTypeid: number) {
    if (subTypeid == -1) {
      this.mastertypeid = this.selectedTab + 1;
      this.subTypeId = null;
      this.mastertypeid = null
    } else {
      this.mastertypeid = this.selectedTab + 1;
      this.subTypeId = subTypeid;
    }
    let data = this.propertyFilterform.value as PropertyFilter;
    data.listingPurposesID = this.listid
    data.rowsNumbers = this.perpagenumber;
    data.pageNumber = this.page;
    data.propertyMasterTypeID = this.mastertypeid;
    data.propertyMasterSubTypeID = this.subTypeId;
    this.propertyMasterTypedesc = this.filterservice.getPropertytMasterTypeid(this.mastertypeid!)
    this.propertySubTypedesc = this.filterservice.getPropertytMasterSubTypeid(this.subTypeId!)
    this.propertyFilter(data);
    this.postPropertyFilter_Count(data);
    this.getPropertyMasterMT(this.mastertypeid);
    this.getPropertySubMetatag(this.subTypeId);
    this.queryParams();
    this.statedatalist()
    this.modalService.dismissAll()
  }
  getsubTyp(subTypeId: number) {
    return propertySubTypeEnum(subTypeId)
  }
  reset() {
    this.minValue = null!;
    this.maxValue = 10000;
  }
  resetpropertyCategory() {
    this.mastertypeid = null;
    this.subTypeId = null;
    this.selectedTab = 0;
    this.statedatalist()
    this.modalService.dismissAll()
  }
  queryParams() {
    this.router.navigate(
      ['propertydetails'],
      {
        queryParams: {
          'purpose': this.liststring,
          'governorate': this.governoratestring,
          'propertyMasterType': this.propertyMasterTypedesc,
          'propertyMasterSubType': this.propertySubTypedesc,
          'unitCategory': this.unitcategorystring,
          'minValue': this.minValue,
          'maxValue': this.maxValue
        }
      })
  }
  inIt() {
    this.route.queryParams.subscribe(params => {
      this.getPropertyListPurposeId(params)
      this.getGovernorateId(params);
      this.getpropertyMasterTypeID(params)
      this.getPropertyMasterSubTypeID(params);
      this.getunitcategoryId(params);
      this.getminPrice(params)
    })
    this.getpurposeMetatag();
    this.getPropertyMasterMT(this.mastertypeid);
    this.getPropertySubMetatag(this.subTypeId);
    this.getUnitMT(this.unitcategoryid);
    this.propertyFilterInIt();
    this.propertyFilterCountInIt();
    this.initiaalizefilters();
    this.getPropertyUnitCategory(this.mastertypeid, this.listid);
  }
  getPropertyListPurposeId(params: any) {
    this.listpurID = this.filterservice.getPurposedesc(params['purpose'])
    if (this.listpurID) {
      this.listid = this.listpurID;
      this.liststring = params['purpose']
    } else if (this.listid == 1) {
      this.liststring = 'Rent';
    } else {
      this.liststring = 'Buy';
    }
  }
  getGovernorateId(params: any) {
    this.governoratcountryid = this.filterservice.getGovernorateDesc(params['governorate'])
    if (this.governoratcountryid) {
      this.governorateid = this.governoratcountryid;
      this.governoratestring = params['governorate'];
    } else if (this.governorateid) {
      this.governoratestring = this.filterservice.getGovernorateid(this.governorateid) ?? "All"
    }
  }
  getunitcategoryId(params: any) {
    this.unitcategoryId = this.filterservice.getPropertytUnitCategorydesc(params['unitCategory'])
    if (this.unitcategoryId) {
      this.unitcategoryid = this.unitcategoryId;
      this.unitcategorystring = params['unitCategory'];
    }
    else {
      this.unitcategorystring = 'All'
    }
  }
  getpropertyMasterTypeID(params: any) {
    this.propertyMasterTypeID = this.filterservice.getPropertytMasterTypedesc(params['propertyMasterType'])
    if (this.propertyMasterTypeID) {
      this.mastertypeid = this.propertyMasterTypeID;
      this.propertyMasterTypedesc = params['propertyMasterType']
    } else {
      this.propertyMasterTypedesc = 'All'
    }
  }
  getPropertyMasterSubTypeID(params: any) {
    this.propertyMasterSubTypeID = this.filterservice.getPropertytMasterSubTypedesc(params['propertyMasterSubType'])
    if (this.propertyMasterSubTypeID) {
      this.subTypeId = this.propertyMasterSubTypeID;
      this.propertySubTypedesc = params['propertyMasterSubType']
    }
  }
  getminPrice(params: any) {
    if (this.minValuestate != undefined) {
      this.minValue = this.minValuestate
    } else if (Number.isNaN(+params['minValue'])) {
      this.minValue = 0
    }
    else {
      this.minValue = +params['minValue'] ?? 0;
    }
    if (this.maxValuestate != undefined) {
      this.maxValue = this.maxValuestate
    } else if (Number.isNaN(+params['maxValue'])) {
      this.maxValue = 10000
    } else {
      this.maxValue = +params['maxValue'] ?? 10000;
    }
  }
  propertyFilterInIt() {
    this.propertyFilterform = this.rxFormBuilder.formGroup(this.propertyfilter);
    let data = this.propertyFilterform.value as PropertyFilter;
    data.listingPurposesID = this.listid;
    data.rowsNumbers = this.perpagenumber;
    data.pageNumber = this.page;
    data.gOVERNORATEID = this.governorateid;
    data.propertyMasterTypeID = this.mastertypeid;
    data.propertyMasterSubTypeID = this.subTypeId;
    data.propertyCategory = this.unitcategoryid;
    data.maxPrice = this.maxValue;
    data.minPrice = this.minValue;
    this.propertyFilter(data);
  }
  propertyFilterCountInIt() {
    let countPayload = this.propertyFilterform.value as PropertyFilter;
    countPayload.listingPurposesID = this.listid;
    countPayload.gOVERNORATEID = this.governorateid;
    countPayload.maxPrice = this.maxValue;
    countPayload.minPrice = this.minValue;
    countPayload.propertyCategory = this.unitcategoryid;
    countPayload.propertyMasterSubTypeID = this.subTypeId;
    countPayload.propertyMasterTypeID = this.mastertypeid;
    this.postPropertyFilter_Count(countPayload);
  }

  getstate() {
    if (this.router.getCurrentNavigation()?.extras.state != undefined) {
      let listingpupose = this.router.getCurrentNavigation()?.extras.state!["purpose"];
      (listingpupose != null || listingpupose != undefined) ? (this.listid = listingpupose) : this.listid = 1;
      this.governorateid = this.router.getCurrentNavigation()?.extras.state!["governorate"];
    }
    else {
      this.listid = 1
    }
  }
  statedatalist() {
    let data = this.sharedmodel
    data.listingPurposesID = this.listid;
    data.gOVERNORATEID = this.governorateid;
    data.propertyMasterTypeID = this.mastertypeid;
    data.propertyMasterSubTypeID = this.subTypeId;
    data.propertyCategory = this.unitcategoryid;
    data.minPrice = this.minValue;
    data.maxPrice = this.maxValue;
    data.pageNumber = this.page;
    data.rowsNumbers = this.perpagenumber;
  }
  getpurposeMetatag() {
    if (this.listid == 1) {
      this.metaService.addTag({id:this.liststring, descrption: " Looking for a rental property in Oman? Mumtalikati has you covered. Explore our extensive listings and find your ideal home. Begin your search now." })
    } else {
      this.metaService.addTag({id:this.liststring,  descrption: "Looking for a house to buy? Mumtalikati offers a diverse range of properties for sale in Oman. Browse through our listings and find a property that suits best." })
    }
  }

  getPropertySubMetatag(id: number): any {
    switch (id) {
      case 1: {
        this.metaService.addTag({id:this.propertySubTypedesc, descrption: "A comprehensive real estate listing portal showcases wide range of building properties in Oman's vibrant market" })
        return
      }
      case 2: {
        this.metaService.addTag({ id:this.propertySubTypedesc, descrption: "Discover a wide range of exquisite townhouse properties in Oman's premier real estate listing portal. Find your perfect home in Mumtalikati today!" })
        return
      }
      case 3: {
        this.metaService.addTag({id:this.propertySubTypedesc, descrption: "Are you in need of a lower portion property? Explore a wide range of lower-portion properties through our comprehensive real estate listing portal." })
        return
      }
      case 4: {
     
        this.metaService.addTag({id:this.propertySubTypedesc, descrption: "Ready to elevate your living experience? Discover the allure of upper-portion properties in Oman's real estate market and find your dream home in Mumtalikati " })
        return
      }
      case 5: {
        this.metaService.addTag({id:this.propertySubTypedesc, descrption: "Unlock a collection of exquisite penthouse properties in Oman's premier real estate listing portal" })
        return
      }
      case 6: {
        this.metaService.addTag({id:this.propertySubTypedesc, descrption: "Seeking the Perfect Retreat? Mumtalikati offers you a diverse selection of stunning villa properties in Oman's " })
        return
      }
      case 7: {
        this.metaService.addTag({id:this.propertySubTypedesc, descrption: "Finding Your Serene Space? Explore Room Rentals in Mumtalikati, Oman Today!" })
        return
      }
      case 8: {
        this.metaService.addTag({id:this.propertySubTypedesc, descrption: "Looking for the Perfect Modern Flat? Explore Mumtalikati, Oman's Contemporary Living!" })
        return
      }
      case 9: {
        this.metaService.addTag({id:this.propertySubTypedesc, descrption: "Ready for a Fusion of Styles? Explore Mumtalikati Now to Discover MixHouse Properties " })
        return
      }
      case 10: {
        this.metaService.addTag({id:this.propertySubTypedesc, descrption: "Looking for Spacious Warehousing Solutions? Unlock a world of expansive storage options with our comprehensive listings" })
        return
      }
      case 11: {
        this.metaService.addTag({id:this.propertySubTypedesc, descrption: "Finding perfect space to establish or expand your business? Discover a world of retail opportunities with our extensive listing of shop properties in Mumtalikati" })
        return
      }
      case 12: {
        this.metaService.addTag({id:this.propertySubTypedesc, descrption: "Elevate your business operations with our premium selection of business center spaces in Mumtalikati. Find the perfect environment to thrive and succeed!" })
        return
      }
      case 13: {
        this.metaService.addTag({id:this.propertySubTypedesc, descrption: "Explore Factory Spaces and find the ideal setting to bring your industrial vision to life with Mumtalikati" })
        return
      }
      case 14: {
        this.metaService.addTag({id:this.propertySubTypedesc, descrption: "Find the perfect venue for your events and gatherings with our diverse range of hall listings in Mumtalikati" })
        return
      }
      case 15: {
        this.metaService.addTag({id:this.propertySubTypedesc, descrption: "Unlock endless possibilities with plots in Mumtalikati, Oman. Create your ideal property from the ground up!" })
        return
      }
      case 16: {
        this.metaService.addTag({id:this.propertySubTypedesc, descrption: "Discover exciting development projects in Mumtalikati and join the journey towards extraordinary accomplishments!" })
        return
      }
      default: {
        break;
      }
    }

  }
  getPropertyMasterMT(id: number): any {
    switch (id) {
      case 1: {
        this.metaService.addTag({id: this.propertyMasterTypedesc, descrption: "Finding a place to call home? Discover such perfect residential properties with Mumtalikati offering the ideal blend of modern living and comfor" })
        return
      }
      case 2: {
        this.metaService.addTag({id: this.propertyMasterTypedesc,  descrption: "Explore exclusive opportunities to rent, buy, and sell commercial properties in Oman's thriving market. Find your ideal property in Mumtalikati today" })
        return
      }
      case 3: {
        this.metaService.addTag({id: this.propertyMasterTypedesc,  descrption: "Finding your dream investment? Unlock exclusive opportunities to transact residential commercial properties in Oman's real estate market." })
        return
      }
      default: {
        break;
      }
    }
  }
  getUnitMT(id: number): any {
    switch (id) {
      case 1: {
        this.metaService.addTag({id:this.unitcategorystring, descrption: "Find your perfect living space with 1BHK properties in Mumtalikati. Experience Comfort and Style in your new home!" })
        return
      }
      case 2: {
        this.metaService.addTag({id:this.unitcategorystring, descrption: "Discover the perfect balance of space and comfort with 2BHK properties in Mumtalikati" })
        return
      }
      case 3: {
        this.metaService.addTag({id:this.unitcategorystring, descrption: "Want to experience the epitome of luxury? Find your ideal 3BHK home for an elevated living! with Mumtalikati" })
        return
      }
      case 4: {
        this.metaService.addTag({id:this.unitcategorystring, descrption: "Spacious and Elegant Homes with 4BHK properties in Mumtalikati. Enhance your Lifestyle to new Heights! " })
        return
      }
      case 5: {
        this.metaService.addTag({id:this.unitcategorystring, descrption: "Find your dream home and Indulge in luxurious living with 5BHK properties in Mumtalikati" })
        return
      }
      case 6: {
        this.metaService.addTag({id:this.unitcategorystring, descrption: "Finding perfect space to establish or expand your business? Discover a world of retail opportunities with our extensive listing of shop properties in Mumtalikati" })
        return
      }
      case 7: {
        this.metaService.addTag({id:this.unitcategorystring, descrption: "Find the Perfect Space in Oman withbMumtalikati. Boost Productivity and success in a professional environment!" })
        return
      }
      case 8: {
        this.metaService.addTag({id:this.unitcategorystring, descrption: "Looking for Spacious Warehousing Solutions? Unlock a world of expansive storage options with our comprehensive listings" })
        return
      }
      case 9: {
        this.metaService.addTag({ id:this.unitcategorystring,descrption: "Explore Factory Spaces and find the ideal setting to bring your industrial vision to life with Mumtalikati" })
        return
      }
      case 10: {
        this.metaService.addTag({id:this.unitcategorystring, descrption: "Find the perfect venue for your events and gatherings with our diverse range of hall listings in Mumtalikati" })
        return
      }
      case 11: {
        this.metaService.addTag({id:this.unitcategorystring, descrption: "Elevate your business operations with our premium selection of business center spaces in Mumtalikati. Find the perfect environment to thrive and succeed! " })
        return
      }
      case 12: {
        this.metaService.addTag({id:this.unitcategorystring, descrption: "Seamlessly accommodate your business needs and aspirations with Mumtalikati’s diverse listings of Whole Building Properties" })
        return
      }
      default: {
        break;
      }
    }
  }
}
