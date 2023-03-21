import { assetUrl } from 'src/single-spa/asset-url';
import { Component, OnInit } from '@angular/core';
import { MumtalikatiService } from '.././services/mumtalikati.service'
import { RentalUnitDetail } from '../models/rental-unit-detail.model';
import { OwnerPropertyFilter, PropertyFilter } from '../models/PropertyFilter.model';
import { Input } from '@angular/core';
import { propertySubTypeEnum } from '../models/enums';
import { Router } from '@angular/router';
@Component({
  selector: 'app-shortdisplay',
  templateUrl: './shortdisplay.component.html',
  styleUrls: ['./shortdisplay.component.scss']
})
export class ShortdisplayComponent implements OnInit {
  loading: boolean = false;
  propertyDetail: RentalUnitDetail[] = [];
  areaimg = assetUrl("icons/Area.svg");
  bedroomimg = assetUrl("icons/Bedroom.svg");
  washroomimg = assetUrl("icons/Washroom.svg");
  bydefault = assetUrl('img/bydefault.png');
  location = assetUrl("icons/location.svg");
  filterCount: any;
  @Input() pageShow: boolean = true;
  propertyfilter = new PropertyFilter();
  ownerPropertyFilter: OwnerPropertyFilter[] = []
  @Input() listid: number = 1;
  @Input() perpagenumber: number = 8;
  @Input() page = 1;
  @Input() governorateid!: number;
  @Input() subTypeId: number | null=null;
  @Input() mastertypeid!: number;
  @Input() unitcategoryid!: number;
  @Input() minValue!: number;
  @Input() maxValue!: number;

  pagination: boolean = false;
  constructor(private mumtalikatiservic: MumtalikatiService, private router: Router,) { }
  ngOnInit(): void {
    let data = this.propertyfilter;
    data.listingPurposesID = this.listid;
    data.rowsNumbers = this.perpagenumber;
    data.pageNumber = this.page;
    data.gOVERNORATEID = this.governorateid;
    data.maxPrice = this.maxValue;
    data.minPrice = this.minValue;
    data.propertyCategory = this.unitcategoryid;
    data.propertyMasterSubTypeID = this.subTypeId??null;
    data.propertyMasterTypeID = this.mastertypeid;
    this.propertyFilter(data);
    let countPayload = this.propertyfilter;
    countPayload.listingPurposesID = this.listid;
    countPayload.gOVERNORATEID = this.governorateid;
    countPayload.maxPrice = this.maxValue;
    countPayload.minPrice = this.minValue;
    countPayload.propertyCategory = this.unitcategoryid;
    countPayload.propertyMasterSubTypeID = this.subTypeId;
    countPayload.propertyMasterTypeID = this.mastertypeid;
    this.postPropertyFilter_Count(countPayload);

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
  async pageChange(page: any) {
    this.loading = true;
    let data = this.propertyfilter;
    data.listingPurposesID = this.listid;
    data.gOVERNORATEID = this.governorateid;
    data.propertyMasterSubTypeID = this.subTypeId??null;
    data.propertyMasterTypeID = this.mastertypeid;
    data.propertyCategory = this.unitcategoryid;
    data.rowsNumbers = this.perpagenumber;
    data.pageNumber = page;
    data.maxPrice=this.maxValue;
    data.minPrice=this.minValue;
    await this.propertyFilter(data)
  }
  getsubType(subTypeId: number) {
    return propertySubTypeEnum(subTypeId);
  }
  onclick(propertyMasterID: number, listingPurposeID: number, unitCategoryID: number, landLordID: number, propertyMasterTypeID: number) {
    this.router.navigate(
      ['Unitscategory'],
      { queryParams: { 'propertyMasterID': propertyMasterID, 'listingPurposeID': listingPurposeID, 'unitCategoryID': unitCategoryID, 'landLordID': landLordID, 'propertyMasterTypeID': propertyMasterTypeID } });
  }
}
