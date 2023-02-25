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
  propertysubType: PropertySubType[] = []
  propertyUnitCategoryType: PropertyUnitCategory[] = [];
  propertyOfCount: any;
  page = 1;
  passenger: any;
  itemsPerPage = 9;
  config: any;
  public listid: number = 1;
  Rent: number = 1;
  unitcategoryid!: number;
  location = assetUrl("icons/location.png");
  areaimg = assetUrl("icons/Area.svg");
  bedroomimg = assetUrl("icons/Bedroom.svg");
  washroomimg = assetUrl("icons/Washroom.svg");
  bydefault = assetUrl('img/bydefault.png');
  selectedTab!: string;
  displayOverlay = 'none';
  closeResult = '';
  configs: any
  public mastertypeid: number = 1;
  public subTypeId: number=1;
  perpagenumber=8;
  constructor(private mumtalikatiservic: MumtalikatiService, private setservice: SetupService, private router: Router, private modalService: NgbModal) { }
  color = { 'color': 'black!important' };
  logocolor = false;
  async ngOnInit() {
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
      backdrop: false,
      ignoreBackdropClick: true,
      keyboard: true,

    };
  }
  onclicks(listingPurposeType: number) {
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
          this.propertyUnitCategoryType = data
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  onclickunitid(unitCategory: number) {
    this.unitcategoryid = unitCategory;
  }

  matTab(masterType: number) {
    this.mastertypeid = masterType;
    this.PropertyDetail(this.mastertypeid, this.subTypeId, this.listid, this.page, this.perpagenumber);
    this.PropertyDetailCount(this.mastertypeid, this.subTypeId, this.listid);
  }
  async pageChange(page: any) {
    this.loading = true;
    await this.PropertyDetail(this.mastertypeid, this.subTypeId, this.listid, page, this.perpagenumber);
  }
  onclick(propertyMasterID: number, listingPurposeID: number, unitCategoryID: number, landLordID: number) {
    this.router.navigate(
      ['Unitscategory'],
      { queryParams: { 'propertyMasterID': propertyMasterID, 'listingPurposeID': listingPurposeID, 'unitCategoryID': unitCategoryID, 'landLordID': landLordID } });
  }
  onsubType(subType: number) {
    this.subTypeId = subType;
    this.PropertyDetail(this.mastertypeid, this.subTypeId, this.listid, this.page, this.perpagenumber);
    this.PropertyDetailCount(this.mastertypeid, this.subTypeId, this.listid);
  }

}
