import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SetupService } from '../services/setup.service';
import { SetFiltersServive } from '../services/setfilters.servive';
import { MumtalikatiService } from '../services/mumtalikati.service';
import { Governorate } from '../models/governorate.model';
import {
  getGovernorateEnumID,
  getPropertySubTypeEnumID,
  getPropertyUnitCategoryEnum,
  listingPurposeTypeEnumid,
  propertyMasterTypeEnumid,
} from '../models/enums';
import { ListingPurpose } from '../models/listing-purpose.model';
import { WilayatModel } from '../models/wilaya';
import { Area } from '../models/area';
import { AreaService } from '../services/areaServices';
import { PropertyUnitCategory } from '../models/propertyUnitCategory.model';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { maxValueModel } from '../models/maxValue.model';
import { Options } from "@angular-slider/ngx-slider";
import { FilterService } from '../services/filterserice';
import { PropertyMasterSubType } from '../models/propertyMasterSubType .model';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-home-filter',
  templateUrl: './home-filter.component.html',
  styleUrls: ['./home-filter.component.scss'],
})
export class HomeFilterComponent implements OnInit {
  loading: boolean = false;
  governorate: Governorate[] = [];
  listingPurposeType: number | null = 1;
  governorateid: number | null = null;
  listingpupose: ListingPurpose[] = [];
  wilaya: WilayatModel[] = [];
  propertysubType: PropertyMasterSubType[] = []
  propertyUnitCategoryType: PropertyUnitCategory[] = [];
  maxPricedata!: maxValueModel;
  arealist: Area[] = [];
  listid: number = 1;
  wilayaid: number = 0;
  minValue: number = 0;
  maxValue!: number;
  subTypeId: number | null = null;
  unitcategoryid: number | null = null;
  configs: any;
  closeResult = '';
  ceilvalue: number;
  options: Options | null = null;
  mastertypeid: number | null = null;
  listdesc: any;
  governoratname: any;
  areaId: number | null = null;
  selectedTab: number = 0;
  propertyMasterTypedesc: any;
  propertySubTypedesc: any;
  unitcategorydesc: any;
  public areadisable: boolean = true;
  selectedArea: string ='';
  selectwilayat: string = '';
  selectGovernorate:string='';
  areaFormControl = new FormControl('', Validators.required);
  wilayatFormControl = new FormControl('', Validators.required);
  lang: string = localStorage.getItem('locale') ?? 'ar'
  hovered=true
  constructor(
    private setservice: SetupService,
    private router: Router,
    private setFilterService: SetFiltersServive,
    private setupFilterServive: SetFiltersServive,
    private areaservice: AreaService,
    private modalService: NgbModal,
    private filterservice: FilterService,
    private mumtalikatiservic: MumtalikatiService,
    private cd: ChangeDetectorRef,
  ) { }

  async ngOnInit() {
    this.getceil();
    this.initiaalizefilters();
  }
  addHoverClass() {
    this.hovered = true;
  }

  removeHoverClass() {
    this.hovered = false;
  }
  getgovernorates() {
    this.setservice
      .getGovernorate()
      .then((data) => {
        if (data) {
          this.governorate = data;
        }
      })
      .catch((error) => {
        this.loading = false;
        console.error(error);
      });
  }
  getlistingPurpose() {
    this.setservice
      .getlistingpurposeset()
      .then((data) => {
        if (data) {
          this.listingpupose = data;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  getWilayat() {
    this.setservice
      .getWilaya()
      .then((data) => {
        if (data) {
          this.wilaya = data.filter(a => a.governorateID===this.governorateid);
          this.setupFilterServive.setwilaya(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  getArea(id: number) {
    this.loading = true;
    this.areaservice.getArea(id)
      .then((data) => {
        if (data) {
          this.arealist = data
        }
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
        console.error(error);
      });
  }
  getPropertyUnitCategoryType() {
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
  getPropertySubType() {
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
  find() {
    this.router.navigate(['propertydetails'], {
      queryParams: {
        purpose: listingPurposeTypeEnumid(this.listid),
        governorate: getGovernorateEnumID(this.governorateid),
        propertyMasterType: this.propertyMasterTypedesc,
        propertyMasterSubType: this.propertySubTypedesc,
        unitCategory: this.unitcategorydesc,
        wilaya: this.wilayaid,
        area: this.areaId,
        minValue: this.minValue,
        maxValue: this.maxValue
      },
      state: {
        areadisable: this.areadisable,
        selectGovernorate:this.selectGovernorate,
        selectwilayat:  this.selectwilayat,
        selectedArea: this.selectedArea
      }
    });
  }
  initiaalizegovernorate() {
    const governorate = this.setFilterService.getGovernorate();
    if (governorate) {
      this.governorate = governorate;
    } else {
      this.getgovernorates();
    }
  }
  initiaalizepurpose() {
    const purpose = this.setFilterService.getListingPurpose();
    if (purpose) {
      this.listingpupose = purpose;
    } else {
      this.getlistingPurpose();
    }
  }
  initiaalizeWilayat() {
    const wilayat = this.setFilterService.getwilaya();
    if (wilayat) {
      this.wilaya = wilayat.filter(a => a.governorateID===this.governorateid);
    } else {
      this.getWilayat();
    }
  }
  initiaalizeUnitProperty() {
    const unitProperty = this.setFilterService.getUnitCategory();
    if (unitProperty) {
      this.propertyUnitCategoryType = unitProperty;
    } else {
      this.getPropertyUnitCategoryType();
    }
  }
  initiaalizePropertySubType() {
    const propertySubType = this.setFilterService.getPropertySubType();
    if (propertySubType) {
      this.propertysubType = propertySubType;
    } else {
      this.getPropertySubType();
    }
  }

  initiaalizefilters() {
    this.initiaalizepurpose();
    this.initiaalizegovernorate();
    // this.initiaalizeWilayat();
    this.getArea(this.wilayaid);
    this.initiaalizeUnitProperty();
    this.initiaalizePropertySubType()
    this.configs = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard: true,
      centered: true,
      scrollable: true,
    };
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
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  getceil() {
    this.loading = true;
    this.mumtalikatiservic.getMaxUnitPrice()
      .then((data) => {
        if (data) {
          this.maxPricedata = data
          if (this.maxValue === undefined) {
            if (this.listid === 1) {
              this.maxValue = this.maxPricedata.maxRentPrice;
              this.ceilvalue = this.maxPricedata.maxRentPrice
              let opt = {
                floor: 0,
                ceil: this.ceilvalue,
                noSwitching: true
              }
              this.options = opt
              // this.inIt();
              // this.queryParams();
            }
            else {
              this.maxValue = this.maxPricedata.maxRentPrice;
              this.ceilvalue = this.maxPricedata.maxRentPrice
              let opt = {
                floor: 0,
                ceil: this.ceilvalue,
                noSwitching: true,
                showTicks: true
              }
              this.options = opt
              // this.inIt();
              // this.queryParams();
            }
          }
          else {
            if (this.listid === 1) {
              this.ceilvalue = this.maxPricedata.maxRentPrice
              let opt = {
                floor: 0,
                ceil: this.ceilvalue,
                noSwitching: true
              }
              this.options = opt
              // this.inIt();
              // this.queryParams();
            } else {
            
              this.ceilvalue = this.maxPricedata.maxSellPrice;
              let opt = {
                floor: 0,
                ceil: this.ceilvalue,
                noSwitching: true
              }
              this.options = opt
              // this.inIt();
              // this.queryParams();
            }
          }
        }
        // this.loading=false;
      })
      .catch((error) => {
        this.loading = false;
        console.error(error);
      })
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
  getpropertyMasterType(masterTypeId: number) {
    return this.filterservice.getPropertytMasterTypeid(masterTypeId)
    // return propertyMasterTypeEnum(masterTypeId)
  }
  getlang(language: string) {
    var lang = {
      "en-US": "All",
      "ar": "الكل",
    }
    return lang[language] || "Unknown";
  }
  getsubType(subTypeId: number) {
    return this.filterservice.getPropertytMasterSubTypeid(subTypeId);
  }
  getsubTyp(subTypeId: number) {
    return this.filterservice.getPropertytMasterSubTypeid(subTypeId);
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
  onsubtypeid(subTypeid: number) {
    // this.popupbutton = false
    if (subTypeid == -1) {
      this.mastertypeid = this.selectedTab + 1;
      this.subTypeId = null;
      // this.mastertypeid = null
    } else {
      this.mastertypeid = this.selectedTab + 1;
      this.subTypeId = subTypeid;
    }
    this.propertyMasterTypedesc = propertyMasterTypeEnumid(this.mastertypeid!)
    this.propertySubTypedesc = getPropertySubTypeEnumID(this.subTypeId!)
    this.modalService.dismissAll()
  }
  onclicks(listingPurposeType: number) {
    this.listid = listingPurposeType;
  }
  onChangeListPurpose(event: any) {
    if (event && this.listid != event.value) {
      this.listid = event.value;
      this.listdesc = listingPurposeTypeEnumid(this.listid)
      if(this.listid ===1){
        this.getceil();
        this.maxValue = this.maxPricedata.maxRentPrice;
        this.ceilvalue = this.maxPricedata.maxRentPrice;
      }else{
        this.getceil();
        this.maxValue = this.maxPricedata.maxSellPrice;
        this.ceilvalue = this.maxPricedata.maxSellPrice;
      }
     
    }
  }
  onChangeGovernorate(event: any) {
    if (event.value == 0) {
      event.value = null;
    }
    if (event && this.governorateid != event.value) {
      this.governorateid = event.value;
      this.selectGovernorate=event.source.triggerValue;
      this.governoratname = getGovernorateEnumID(event.value)
      this.initiaalizeWilayat();
    }
  }
  governorateId() {
    this.governorateid = null;
  }
  onChangewilaya(event: any) {
    if (event.value == 0) {
      event.value = null;
    }
    if (event && this.wilayaid != event.value) {
      this.wilayaid = event.value;
      this.selectwilayat = event.source.triggerValue;
      // this.governoratname = getGovernorateEnumID(event.value)
      if (this.wilayaid == null) {
        this.areadisable = true;
        this.areadisable = true;
      } else {
        this.areadisable = false;
        this.areadisable = false;
        this.getArea(this.wilayaid)
      }
    }
  }
  wilayanullid() {
    this.wilayaid = null;
    this.areadisable = true;
    this.areadisable = true;

  }
  onChangeArea(event: any) {
    if (event.value == 0) {
      event.value = null;
    }
    if (event && this.areaId != event.value) {
      this.areaId = event.value;
      this.selectedArea = event.source.triggerValue;
      this.getArea(this.wilayaid)

    }
  }
  resetpropertyCategory() {
    this.mastertypeid = null;
    this.subTypeId = null;
    this.selectedTab = 0;
    this.getPropertySubType
    this.modalService.dismissAll()
  }
  allCheck() {
    this.unitcategoryid = null;
    this.unitcategorydesc = this.filterservice.getPropertytUnitCategoryid(this.unitcategoryid!);
  }
  onUnitcategory(unitcategory: number) {
    this.unitcategoryid = unitcategory
    this.unitcategorydesc = getPropertyUnitCategoryEnum(this.unitcategoryid!)
  }
  reset() {
    this.minValue = null;
    this.maxValue = this.ceilvalue;
    this.modalService.dismissAll();
  }
  onpopupclose() {
    // let data = this.propertyFilterform.value as PropertyFilter;
    // data.maxPrice = this.maxValue;
    // data.minPrice = this.minValue

    this.modalService.dismissAll();
  }

}
