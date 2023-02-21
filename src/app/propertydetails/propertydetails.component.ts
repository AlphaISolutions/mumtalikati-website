import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { assetUrl } from 'src/single-spa/asset-url';
import { ListingPurpose } from '../models/listing-purpose.model';
import { PropertyMasterType } from '../models/property-master-type.model';
import { PropertySubType } from '../models/propertySubType.model';
import { RentalUnitDetail } from '../models/rental-unit-detail.model';
import { MumtalikatiService } from '../services/mumtalikati.service';
import { SetupService } from '../services/setup.service';

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
  propertyOfCount: any;
  page = 1;
  passenger: any;
  itemsPerPage = 9;
  config: any;

  Rent: string = "Rent";
  location = assetUrl("icons/location.png");
  areaimg = assetUrl("icons/Area.svg");
  bedroomimg = assetUrl("icons/Bedroom.svg");
  washroomimg = assetUrl("icons/Washroom.svg");
  bydefault = assetUrl('img/bydefault.png');
  constructor(private mumtalikatiservic: MumtalikatiService, private setservice: SetupService, private router: Router) { }

  ngOnInit(): void {
    this.PropertyDetail(3, 1, 1, 1, 8);
    this.PropertyDetailCount(3, 1, 1);
    this.getlistingPurpose();
    this.getPropertyMasterType();
    this.getPropertySubType();
    this.config = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.page,
      totalItems: this.propertyOfCount
    };
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
  async pageChange(page: any) {
    this.loading = true;
    await this.PropertyDetail(3, 1, 1, page, 8);
  }
  onclick(propertyMasterID: number, listingPurposeID: number, unitCategoryID: number, landLordID: number) {
    this.router.navigate(
      ['Unitscategory'],
      { queryParams: { 'propertyMasterID': propertyMasterID, 'listingPurposeID':listingPurposeID, 'unitCategoryID': unitCategoryID, 'landLordID':landLordID }});
  }
}
