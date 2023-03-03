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
import { PropertyMasterTypeEnum, propertySubTypeEnum } from '../models/enums';
import { PropertyMasterSubType } from '../models/propertyMasterSubType .model';
import { PropertyFilter } from '../models/PropertyFilter.model';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
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
  propertyfilter= new PropertyFilter() ;
  propertyOfCount: any;
  page = 1;
  passenger: any;
  itemsPerPage: number = 9;
  config: any;
  public listid: number = 1;
  Rent: number = 1;
  public unitcategoryid: number = 1;
  location = assetUrl("icons/location.png");
  areaimg = assetUrl("icons/Area.svg");
  bedroomimg = assetUrl("icons/Bedroom.svg");
  washroomimg = assetUrl("icons/Washroom.svg");
  bydefault = assetUrl('img/bydefault.png');
  selectedTab!: string;
  closeResult = '';
  configs: any
  public mastertypeid: number = 1;
  public subTypeId: number = 1;
  perpagenumber = 8;
  color = { 'color': 'black!important' };
  logocolor: boolean = false;
  inputfild: boolean = true;
  areadisable: boolean = false;
  propertyFilterform!: FormGroup;
  priceMax: number[] = [ 0, 5000, 10000, 15000, 20000];
  priceMin: number[] = [ 5000, 10000, 15000, 20000, 25000]
  areaMax: string[] = ['40', '60', '80', '100', '120'];
  areaMin: string[] = ['60', '80', '100', '120', '140'];
  constructor(private rxFormBuilder: RxFormBuilder, private mumtalikatiservic: MumtalikatiService, private setservice: SetupService, private router: Router, private modalService: NgbModal) { }
  async ngOnInit() {
    this.propertyFilterform = this.rxFormBuilder.formGroup(this.propertyfilter);
    this.PropertyDetail(this.mastertypeid, this.subTypeId, this.listid, this.page, this.perpagenumber);
    this.PropertyDetailCount(this.mastertypeid, this.subTypeId, this.listid);
    this.getlistingPurpose();
    this.getPropertyMasterType();
    this.getPropertySubType();
    this.getPropertyUnitCategoryType();
    this.config = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.page,
      totalItems: this.propertyOfCount
    };
    this.configs = {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard: true,

    };
  }
  async onclicks(listingPurposeType: number) {
    this.listid = listingPurposeType;
    this.PropertyDetail(this.mastertypeid, this.subTypeId, this.listid, this.page, this.perpagenumber);
    this.PropertyDetailCount(this.mastertypeid, this.subTypeId, this.listid);
  }
  async PropertyDetail(propertyMasterTypeID: number, propertyMasterSubTypeID: number, listingPurposesID: number, pageNumber: number, rowsNumbers: number) {
    this.loading = true;
    this.mumtalikatiservic.getPropertyDetailIndex(propertyMasterTypeID, propertyMasterSubTypeID, listingPurposesID, pageNumber, rowsNumbers)
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  async PropertyDetailCount(propertyMasterTypeID: number, propertyMasterSubTypeID: number, listingPurposesID: number) {
    this.mumtalikatiservic.getPropertyDetailCount(propertyMasterTypeID, propertyMasterSubTypeID, listingPurposesID)
      .then((data) => {
        if (data) {
          this.propertyOfCount = data;
        }
      })
      .catch((error) => {

        console.error(error);
      });
  }
  async getlistingPurpose() {
    this.loading = true;
    this.setservice.getlistingpurposeset()
      .then((data) => {
        if (data) {
          this.listingpupose = data

        }
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
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
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
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
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
        console.error(error);
      });
  }
  async getPropertyUnitCategoryType() {
    this.setservice.getPropertyUnitCategoryTypes()
      .then((data) => {
        if (data) {
          this.propertyUnitCategoryType = data
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  onSubmit() {
    this.loading = true;
    let data = this.propertyFilterform.value as PropertyFilter;
    data.listingPurposesID = this.listid;
    data.propertyMasterSubTypeID = this.subTypeId;
    data.propertyMasterTypeID = this.mastertypeid;
    data.propertyCategory = this.unitcategoryid;
    data.rowsNumbers = this.perpagenumber;
    data.pageNumber = this.page;
    this.mumtalikatiservic.postPropertyFilter(data)
      .then((data) => {
        if (data) {
          data.forEach((e) => {
            let rentalUnitDetail = new RentalUnitDetail()
            rentalUnitDetail.listingPurposeID = e.listingPurposeID;
            rentalUnitDetail.propertyMasterID = e.propertyMasterID;
            rentalUnitDetail.unitCategoryID = e.unitCategoryID;
            rentalUnitDetail.addressStr = e.addressStr;
            rentalUnitDetail.bathRoom = e.bathRoom;
            rentalUnitDetail.bedRoom = e.bedRoom;
            rentalUnitDetail.contact = e.contact;
            rentalUnitDetail.imageString = e.imageString;
            rentalUnitDetail.landLordID = e.landLordID;
            rentalUnitDetail.pageNumber=e.pageNumber;
            rentalUnitDetail.plotNumber=e.plotNumber;
            rentalUnitDetail.propertyMasterName=e.propertyMasterName;
            rentalUnitDetail.propertyUnitDescription=e.propertyUnitDescription;
            rentalUnitDetail.unitName=e.unitName;
            rentalUnitDetail.totalCount=e.totalCount;
            rentalUnitDetail.sqft=e.sqft;
            rentalUnitDetail.sellPrice=e.sellPrice;
            rentalUnitDetail.propertyMasterTypeID=e.propertyMasterTypeID;
            rentalUnitDetail.propertyUnitid=e.propertyUnitID;
            rentalUnitDetail.rentPrice=e.rentPrice;
            rentalUnitDetail.rownumberId=e.rownumberId;
            rentalUnitDetail.rowsIndex=e.rowsIndex;
            rentalUnitDetail.rowsNumbers=e.rowsNumbers;
            this.propertyDetail.push(rentalUnitDetail);
          })
          
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
    this.PropertyDetail(this.mastertypeid, this.subTypeId, this.listid, this.page, this.perpagenumber);
    this.PropertyDetailCount(this.mastertypeid, this.subTypeId, this.listid);
  }
  async pageChange(page: any) {
    this.loading = true;
    await this.PropertyDetail(this.mastertypeid, this.subTypeId, this.listid, page, this.perpagenumber);
  }
  onclick(propertyMasterID: number, listingPurposeID: number, unitCategoryID: number, landLordID: number, propertyMasterTypeID: number) {
    this.router.navigate(
      ['Unitscategory'],
      { queryParams: { 'propertyMasterID': propertyMasterID, 'listingPurposeID': listingPurposeID, 'unitCategoryID': unitCategoryID, 'landLordID': landLordID, 'propertyMasterTypeID': propertyMasterTypeID } });
  }
  onsubType(propertyMasterTypeID: number, subType: number) {
    let pmtid = propertyMasterTypeID
    this.subTypeId = subType;

    this.PropertyDetail(this.mastertypeid, this.subTypeId, this.listid, this.page, this.perpagenumber).then((result) => {
      this.modalService.dismissAll();
    })
    this.PropertyDetailCount(this.mastertypeid, this.subTypeId, this.listid);

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
    this.modalService.dismissAll();
  }
  addminprice(value: number) {

    this.propertyFilterform.get('minPrice')?.patchValue(value);

  }
  addmaxprice(value: number) {
    this.propertyFilterform.get('maxPrice')?.patchValue(value);
  }
  getsubType(subTypeId:number){
    return propertySubTypeEnum(subTypeId);
  }
}
