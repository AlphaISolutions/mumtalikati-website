import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { assetUrl } from 'src/single-spa/asset-url';
import { ListingPurpose } from '../models/listing-purpose.model';
import { PropertyMasterType } from '../models/property-master-type.model';
import { PropertySubType } from '../models/propertySubType.model';
import { PropertyUnitCategory } from '../models/propertyUnitCategory.model';
import { RentalUnitDetail } from '../models/rental-unit-detail.model';
import { MumtalikatiService } from '../services/mumtalikati.service';
import { SetupService } from '../services/setup.service';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { listingPurposeTypeEnum, propertyMasterTypeEnum, PropertyMasterTypeEnum, propertySubTypeEnum } from '../models/enums';
import { PropertyMasterSubType } from '../models/propertyMasterSubType .model';
import { OwnerPropertyFilter, PropertyFilter } from '../models/PropertyFilter.model';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { Governorate } from '../models/governorate.model';
import { forkJoin, map } from 'rxjs';
import { SetFiltersServive } from '../services/setfilters.servive';
import { Options, LabelType } from "@angular-slider/ngx-slider";
import { MatTabChangeEvent } from '@angular/material/tabs';
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
  selectedTab!: string;
  closeResult = '';
  configs: any
  propertyMasterTypeId: number = 1;
  mastertypeid: number =1;
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
  public governorateid: number | null = null;
  btnColor = { 'background-color': '#9e2a2b' }
  activeroutes = { 'background-color': '#9e2a2b' }
  id: number | null = null;
  governorate: Governorate[] = [];
  public minValue: number | null = 0;
  public maxValue: number | null = 2000;
  options: Options = {
    floor: 0,
    ceil: 2000
  }
  constructor(private rxFormBuilder: RxFormBuilder, private mumtalikatiservic: MumtalikatiService, private setservice: SetupService, private router: Router, private modalService: NgbModal, private setupFilterServive: SetFiltersServive) {
    if (this.router.getCurrentNavigation()?.extras.state != undefined) {
      let listingpupose = this.router.getCurrentNavigation()?.extras.state!["listingPurposeID"];
      if (listingpupose != null || listingpupose != undefined) {
        this.listid = listingpupose;
      }
      else {
        this.listid = 1;
      }

      this.governorateid = this.router.getCurrentNavigation()?.extras.state!["governorateid"];
    }
    else {
      this.listid = 1
    }
  }
  async ngOnInit() {
    this.propertyFilterform = this.rxFormBuilder.formGroup(this.propertyfilter);
    let data = this.propertyFilterform.value as PropertyFilter;
    data.listingPurposesID = this.listid;
    data.rowsNumbers = this.perpagenumber;
    data.pageNumber = this.page;
    data.gOVERNORATEID = this.governorateid;
    this.propertyFilter(data);
    let countPayload = this.propertyFilterform.value as PropertyFilter;
    countPayload.listingPurposesID = this.listid;
    countPayload.gOVERNORATEID = this.governorateid;
    this.postPropertyFilter_Count(countPayload);
    this.configs = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard: true,
      centered: true,
      scrollable: true,
    };
    this.initiaalizefilters()
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
  // getFilterdata() {
  //   debugger
  //   this.loading = true;
  //   forkJoin({
  //     propertyListPurpose: this.setFiltersServive.getListingPurpose() ,
  //     propertyMasterType: this.setFiltersServive.getPropertyMasterType(),
  //     propertyPropertySubType: this.setservice.getPropertySubTypes(),
  //     propertyUnitCategoryTypes: this.setservice.getPropertyUnitCategoryTypes(),
  //     propertyGovernorates: this.setservice.getGovernorate(),
  //   }).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   ).subscribe((data) => {
  //     this.listingpupose = <Array<any>>data.propertyListPurpose;
  //     this.propertymasterType = <Array<any>>data.propertyMasterType;
  //     this.propertysubType = <Array<any>>data.propertyPropertySubType;
  //     this.propertyUnitCategoryType = <Array<any>>data.propertyUnitCategoryTypes;
  //     this.governorate = <Array<any>>data.propertyGovernorates;
  //     this.setFiltersServive.startSession(
  //       this.listingpupose, this.propertymasterType, this.propertysubType, this.propertyUnitCategoryType, this.governorate)
  //     this.loading = false;
  //   }, error => {
  //     this.loading = false;
  //     console.error(error);
  //   });
  // }
  async onclicks(listingPurposeType: number) {
    this.listid = listingPurposeType;
  }

  open(content: any) {
    this.mastertypeid=1;
    this.modalService.open(content, this.configs).result.then(

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



  async getlistingPurpose() {
    this.loading = true;
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
    this.loading = true;
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
    this.loading = true;
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
    this.loading = true;
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


  onclickunitid(unitCategory: number) {
    this.unitcategoryid = unitCategory;
  }
  async matTab(masterType: number) {
    this.mastertypeid = masterType;
    this.propertyMasterTypeId = this.mastertypeid;

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

  onsubType(propertyMasterTypeID: number, subType: number) {
    let pmtid = propertyMasterTypeID
    this.subTypeId = subType;
    this.modalService.dismissAll();
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
  onpopupclose() {
    let data = this.propertyFilterform.value as PropertyFilter;
    data.listingPurposesID = this.listid
    data.rowsNumbers = this.perpagenumber;
    data.pageNumber = this.page;
    data.maxPrice = this.maxValue;
    data.minPrice = this.minValue
    this.propertyFilter(data)
    this.postPropertyFilter_Count(data)
    this.modalService.dismissAll();
  }
  addminprice(value: number) {

    this.propertyFilterform.get('minPrice')?.patchValue(value);

  }
  addmaxprice(value: number) {
    this.propertyFilterform.get('maxPrice')?.patchValue(value);
  }
  getsubType(subTypeId: number) {
    return propertySubTypeEnum(subTypeId);
  }

  all() {
    this.unitcategoryid = null;
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
  getGovernorate(id: number) {
    this.governorateid = id;
  }
  governorateId() {
    this.governorateid = this.id;
  }
  getlistpurpose(listid: number) {
    return listingPurposeTypeEnum(listid);
  }
  getpropertyMasterType(masterTypeId: number) {
    return propertyMasterTypeEnum(masterTypeId)
  }
  onChangeListPurpose(event: any) {
    if (event && this.listid != event.value) {
      this.listid = event.value;
      let data = this.propertyFilterform.value as PropertyFilter;
      data.listingPurposesID = this.listid
      data.rowsNumbers = this.perpagenumber;
      data.pageNumber = this.page;
      this.propertyFilter(data)
      this.postPropertyFilter_Count(data)
    } else {

    }
  }
  onChangeGovernorate(event: any) {
    if (event && this.governorateid != event.value) {
      this.governorateid = event.value;
      let data = this.propertyFilterform.value as PropertyFilter;
      data.listingPurposesID = this.listid
      data.gOVERNORATEID = this.governorateid;
      data.rowsNumbers = this.perpagenumber;
      data.pageNumber = this.page;
      this.propertyFilter(data)
      this.postPropertyFilter_Count(data)
    } else {

    }
  }
  getPropertyUnitCategory(id: any) {
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
        let residentialcommercialList = this.propertyUnitCategoryType

        return residentialcommercialList;
      }
      default:
        {


          return this.propertyUnitCategoryType;
        }

    }
  }

  tabChanged = async (tabChangeEvent: MatTabChangeEvent): Promise<void> => {

    switch (tabChangeEvent.index) {
      case 0:
        this.mastertypeid = 1;
        break;
      case 1:
        this.mastertypeid = 2
        break;
      case 2:
        this.mastertypeid = 3
        break;
      default:
        break;
    }
  }

  filterFunction(propertymastertypeid:any): any[] {  
 
    return this.propertysubType.filter(buttom => buttom.propertyMasterTypeID !== propertymastertypeid);
}


  onUnitcategory(unitcategory: number) {
    console.log(unitcategory)

  }
  reSet() {

    this.minValue = null;
  }
}
