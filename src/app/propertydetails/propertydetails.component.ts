import { Component, OnInit, ViewChild } from '@angular/core';
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
import { MatTabChangeEvent } from '@angular/material/tabs';
import { BspropertyService } from '../services/behaviour.subject/propertyDetail.bs.service';
import { FilterService } from '../services/filterserice';

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
  propertyOfCount: any;
  ownerPropertyFilter: OwnerPropertyFilter[] = []
  page = 1;
  passenger: any;
  itemsPerPage: number = 9;
  public listid: number = 1;
  Rent: number = 1;
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
  inputfild: boolean = true;
  areadisable: boolean = false;
  propertyFilterform!: FormGroup;
  filterCount: any;
  coler = { ' background-color': 'red' }
  hovercolor = { ' background-color': 'red' }
  governorateid!: number;
  btnColor = { 'background-color': '#9e2a2b' };
  togglericon = { 'color': '#fffff !important' }
  activeroutes = { 'color': '#9e2a2b !important', 'font-weight': '500' };
  id: number | null = null;
  governorate: Governorate[] = [];
  public minValue: number = 0;
  public maxValue: number = 10000;
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
  governoratestring!: string;
  liststring!: string;
  unitcategorystring!: string;
  propertyMasterTypestring!: string
  propertyMasterSubTypeIDstring!: string
  minValuestate!: number;
  maxValuestate!: number;

  @ViewChild('tabGroup') tabGroup: any;
  listpurID: any
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
    private filterservice: FilterService) {
    if (this.router.getCurrentNavigation()?.extras.state != undefined) {
      let listingpupose = this.router.getCurrentNavigation()?.extras.state!["purpose"];
      if (listingpupose != null || listingpupose != undefined) {
        this.listid = listingpupose;
      }
      else {
        this.listid = 1;
      }

      this.governorateid = this.router.getCurrentNavigation()?.extras.state!["governorate"];
      this.mastertypeid = this.router.getCurrentNavigation()?.extras.state!["propertyMasterType"];
      this.subTypeId = this.router.getCurrentNavigation()?.extras.state!["propertyMasterSubType"];
      this.unitcategoryid = this.router.getCurrentNavigation()?.extras.state!["unitCategory"];
      this.minValuestate = this.router.getCurrentNavigation()?.extras.state!["minValue"];
      this.minValue = this.minValuestate
      this.maxValuestate = this.router.getCurrentNavigation()?.extras.state!["maxValue"];
      this.maxValue = this.maxValuestate
    }
    else if (this.route.queryParams != undefined) {
      this.inIt();
    }
    else {
      this.listid = 1
    }
  }
  async ngOnInit() {
    // this.listpurID =this.filterservice.getPurposedesc(this.route.snapshot.paramMap.get('liststring')!) ;
    // if (this.listpurID) {
    //       this.listid = this.listpurID;
    //       this.liststring = this.route.snapshot.paramMap.get('liststring')!
    //     } else if (this.listid == 1) {
    //       this.liststring = 'Rent';
    //     } else {
    //       this.liststring = 'Buy';
    //     }
    this.inIt();
    this.propertyFilterInIt();
    this.propertyFilterCountInIt();
    this.queryParams();
    this.configs = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard: true,
      centered: true,
      scrollable: true,
    };
    this.initiaalizefilters()
    this.getPropertyUnitCategory(this.mastertypeid, this.listid);
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


        // return tempData;
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

      }

      )
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
      }
      );
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
    data.listingPurposesID = this.listid;
    data.gOVERNORATEID = this.governorateid;
    data.propertyMasterSubTypeID = this.subTypeId;
    data.propertyMasterTypeID = this.mastertypeid;
    data.propertyCategory = this.unitcategoryid;
    data.rowsNumbers = this.perpagenumber;
    data.pageNumber = page;
    await this.propertyFilter(data)
  }

  getsubType(subTypeId: number) {
    return propertySubTypeEnum(subTypeId);
  }
  getGovernorate(id: number) {
    this.governorateid = id;
    this.queryParams();
  }
  governorateId() {
    this.governorateid != null;
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
      this.listdesc = this.filterservice.getPurposeid(this.listid)
      this.liststring = this.listdesc
      this.queryParams()
      data.rowsNumbers = this.perpagenumber;
      data.pageNumber = this.page;
      this.propertyFilter(data)
      this.postPropertyFilter_Count(data)

    }

  }
  onChangeGovernorate(event: any) {

    if (event.value == 0) {
      event.value = null;
    }
    if (event && this.governorateid != event.value) {
      this.governorateid = event.value;
      let data = this.propertyFilterform.value as PropertyFilter;
      data.listingPurposesID = this.listid
      data.gOVERNORATEID = this.governorateid;
      this.governoratname = this.filterservice.getGovernorateid(this.governorateid)
      this.governoratestring = this.governoratname
      this.queryParams()
      data.rowsNumbers = this.perpagenumber;
      data.pageNumber = this.page;
      this.propertyFilter(data)
      this.postPropertyFilter_Count(data)
    } else {

    }
  }
  onpopupclose() {
    let data = this.propertyFilterform.value as PropertyFilter;
    data.listingPurposesID = this.listid
    data.rowsNumbers = this.perpagenumber;
    data.pageNumber = this.page;
    data.maxPrice = this.maxValue;
    data.minPrice = this.minValue
    this.queryParams()
    this.propertyFilter(data)
    this.postPropertyFilter_Count(data)
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


        // return residentialcommercialList;
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

  open(content: any) {

    // this.get(1)
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
  tabChanged = async (tabChangeEvent: MatTabChangeEvent): Promise<void> => {
    this.selectedTab = tabChangeEvent.index
    switch (tabChangeEvent.index) {
      case 0: {

        this.get(1);
        break;
      }

      case 1: {

        this.get(2);
        break;
      }

      case 2: {

        this.get(3);
        break;
      }

      default: {
        break;
      }

    }
  }

  filterFunction(propertymastertypeid: any, listid: any): any {

    switch (propertymastertypeid) {
      case 1: {
        if (listid == 1) {
          let data = this.propertysubType.filter(buttom => buttom.propertyMasterTypeID == propertymastertypeid && (buttom.propertySubTypeID == 1 || buttom.propertySubTypeID == 2 || buttom.propertySubTypeID == 3 || buttom.propertySubTypeID == 4 || buttom.propertySubTypeID == 5 || buttom.propertySubTypeID == 6 || buttom.propertySubTypeID == 7));

          return data;
        } else {
          let data = this.propertysubType.filter(buttom => buttom.propertyMasterTypeID == propertymastertypeid && (buttom.propertySubTypeID == 1 || buttom.propertySubTypeID == 2 || buttom.propertySubTypeID == 3 || buttom.propertySubTypeID == 4 || buttom.propertySubTypeID == 5 || buttom.propertySubTypeID == 6 || buttom.propertySubTypeID == 7 || buttom.propertySubTypeID == 15));
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
    data.listingPurposesID = this.listid
    data.rowsNumbers = this.perpagenumber;
    data.pageNumber = this.page;
    data.propertyMasterTypeID = this.mastertypeid;
    this.unitcategorydesc = this.filterservice.getPropertytUnitCategoryid(this.unitcategoryid!)
    this.unitcategorystring = this.unitcategorydesc
    this.queryParams()
    data.propertyCategory = this.unitcategoryid;
    this.propertyFilter(data)
    this.postPropertyFilter_Count(data)
  }
  allCheck() {
    this.unitcategoryid = null;
    this.unitcategorydesc = this.filterservice.getPropertytUnitCategoryid(this.unitcategoryid!)
    this.unitcategorystring = this.unitcategorydesc
    this.queryParams()
    let data = this.propertyFilterform.value as PropertyFilter;
    data.listingPurposesID = this.listid
    data.rowsNumbers = this.perpagenumber;
    data.pageNumber = this.page;
    data.propertyMasterTypeID = this.mastertypeid;
    data.propertyCategory = this.unitcategoryid;
    this.propertyFilter(data)
    this.postPropertyFilter_Count(data)
  }
  get(mastertypeid: number) {
    // let data = this.propertyFilterform.value as PropertyFilter;
    // data.listingPurposesID = this.listid
    // data.rowsNumbers = this.perpagenumber;
    // data.pageNumber = this.page;
    // data.propertyMasterTypeID = mastertypeid;
    // data.propertyMasterSubTypeID = null;
    // this.postPropertyFilter_Count(data)
    // this.propertyFilter(data)

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
    this.propertyMasterTypedesc = this.filterservice.getPropertytMasterTypeid(this.mastertypeid!)
    this.propertyMasterTypestring = this.propertyMasterTypedesc
    data.propertyMasterSubTypeID = this.subTypeId;
    this.propertySubTypedesc = this.filterservice.getPropertytMasterSubTypeid(this.subTypeId!)
    this.propertyMasterSubTypeIDstring = this.propertySubTypedesc?.desc

    this.queryParams()
    this.propertyFilter(data)
    this.postPropertyFilter_Count(data);
    this.modalService.dismissAll()
  }
  getsubTyp(subTypeId: number) {
    return propertySubTypeEnum(subTypeId)
  }
  reSet() {
    this.minValue = null!;
    this.maxValue = 10000;
  }
  resetpropertyCategory() {
    this.mastertypeid = null;
    this.subTypeId = null;
    this.selectedTab = 0;
    this.modalService.dismissAll()
  }
  // queryParams() {
  //   debugger
  //   const queryParams = {
  //     'purpose':this.liststring,
  //     'governorate':this.governoratestring,
  //     'propertyMasterType':this.propertyMasterTypestring,
  //     'propertyMasterSubType':this.propertyMasterSubTypeIDstring ?? this.allselection,
  //     'unitCategory':this.unitcategorystring,
  //     'minValue': this.minValue,
  //     'maxValue': this.maxValue
  //   };
  //   const queryParamArray = [];
  //   for (const [key,value] of Object.entries(queryParams)) {
  //     queryParamArray.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
  //   }
  //   const queryString = queryParamArray.join('/');
  //   this.router.navigate(['propertydetails',queryString]);
  // }
  queryParams() {
    const queryParams = {
      'purpose': this.liststring,
      'governorate': this.governoratestring,
      'propertyMasterType': this.propertyMasterTypestring,
      'propertyMasterSubType': this.propertyMasterSubTypeIDstring ?? this.allselection,
      'unitCategory': this.unitcategorystring,
      'minValue': this.minValue,
      'maxValue': this.maxValue
    };

    const queryParamArray = [];
    for (const [key, value] of Object.entries(queryParams)) {
      queryParamArray.push(`${key}=${encodeURIComponent(value)}`);
    }

    const queryString = queryParamArray.join('/');
    // const url = 'propertydetails' + queryString.replaceAll(/%2F/g, '/');
    // const decodedQueryString = decodeURIComponent(url);
    this.router.navigate(['propertydetails'+ queryString] );

  }

  inIt() {
    this.route.params.subscribe(params => {
      this.listpurID = this.filterservice.getPurposedesc(params['purpose'])
      if (this.listpurID) {
        this.listid = this.listpurID;

        this.liststring = params['purpose']
      } else if (this.listid == 1) {
        this.liststring = 'Rent';
      } else {
        this.liststring = 'Buy';
      }
    })
    this.route.params.subscribe(params => {

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
      this.listpurID = this.filterservice.getPurposedesc(params['purpose'])
      if (this.listpurID) {
        this.listid = this.listpurID;

        this.liststring = params['purpose']
      } else if (this.listid == 1) {
        this.liststring = 'Rent';
      } else {
        this.liststring = 'Buy';
      }
      this.governoratcountryid = this.filterservice.getGovernorateDesc(params['governorate'])
      if (this.governoratcountryid) {
        this.governorateid = this.governoratcountryid;
        this.governoratestring = params['governorate'];
      } else {
        this.governoratestring = 'All'
      }
      this.unitcategoryId = this.filterservice.getPropertytUnitCategorydesc(params['unitCategory'])
      if (this.unitcategoryId) {
        this.unitcategoryid = this.unitcategoryId;
        this.unitcategorystring = params['unitCategory']
      }
      else {
        this.unitcategorystring = 'All'
      }
      this.propertyMasterTypeID = this.filterservice.getPropertytMasterTypedesc(params['propertyMasterType'])
      if (this.propertyMasterTypeID) {
        this.mastertypeid = this.propertyMasterTypeID;
        this.propertyMasterTypestring = params['propertyMasterType']
      } else {
        this.propertyMasterTypestring = 'All'

      }
      this.propertyMasterSubTypeID = this.filterservice.getPropertytMasterSubTypedesc(params['propertyMasterSubType'])
      if (this.propertyMasterSubTypeID) {
        this.subTypeId = this.propertyMasterSubTypeID;
      }

    })
  }
  propertyFilterInIt() {
    this.propertyFilterform = this.rxFormBuilder.formGroup(this.propertyfilter);
    let data = this.propertyFilterform.value as PropertyFilter;
    data.listingPurposesID = this.listid;
    data.rowsNumbers = this.perpagenumber;
    data.pageNumber = this.page;
    data.gOVERNORATEID = this.governorateid;
    data.propertyMasterTypeID = this.mastertypeid;
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

}
