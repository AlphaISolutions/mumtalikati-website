
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Governorate } from '../models/governorate.model';
import { ListingPurpose } from '../models/listing-purpose.model';
import { OwnerPropertyFilter, PropertyFilter } from '../models/PropertyFilter.model';
import { MumtalikatiService } from '../services/mumtalikati.service';
import { SetFiltersServive } from '../services/setfilters.servive';
import { SetupService } from '../services/setup.service';
import { getGovernorateEnumID, listingPurposeTypeEnumid } from '../models/enums';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private setservice: SetupService, private router: Router, private setFilterService: SetFiltersServive, private mumtalikatiservic: MumtalikatiService) {
   }
  loading: boolean = false;
  governorate: Governorate[] = [];
  listingpupose: ListingPurpose[] = [];
  propertyfilter = new PropertyFilter();
  ownerPropertyFilter: OwnerPropertyFilter[] = []
  governorateid: number | null = null;
  listingPurposeType: number | null = 1;
  listid: number | null = 1
  pageNumber: number = 1;
  rowsNumber: number = 8;
  color: any
  toggle: any;
  isActive: boolean = false;
  page: boolean = false;
  rightrow: boolean = false;
  leftrow: boolean = false;
  elementStyles: any = {
    'color': this.isActive ? 'green' : 'red'
  }
  getColorClass() {
    return this.isActive ? 'active' : 'inactive';
  }
  async ngOnInit() {
    this.button();
    let governorate = this.setFilterService.getGovernorate()
    if (governorate) {
      this.governorate = governorate
    }
    else {
      this.getgovernorates();
    }
    let listpurpose = this.setFilterService.getListingPurpose()
    if (listpurpose) {
      this.listingpupose = listpurpose;
    } else {
      this.getlistingPurpose();
    }
    this.getgovernorates();
    this.getlistingPurpose();

    if (this.toggle) {

      this.color = { 'background-color': 'white!important', 'color': 'black!important' }
    } else {
      this.color = { 'background-color': 'transparent!important' }
    }
    let data = this.propertyfilter;
    data.listingPurposesID = this.listid;
    data.pageNumber = this.pageNumber;
    data.rowsNumbers = this.rowsNumber;
    this.propertyFilter(data)
  }
 
   getgovernorates() {
    this.loading = true;
    this.setservice.getGovernorate()
      .then((data) => {
        if (data) {
          this.governorate = data
        }
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
        console.error(error);
      });
  }
  onclicks(id: number) {
    this.governorateid = id
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
  onclick(listingPurposeType: number) {
    this.listingPurposeType = listingPurposeType;
  }
  button() {
    if (localStorage.getItem('locale') == 'ar') {
      this.rightrow = true;
    }else{
      this.leftrow=true;
    }
  }
  find() {
    this.router.navigate(['propertydetails'],
      {
        queryParams: { 'purpose':listingPurposeTypeEnumid(this.listingPurposeType) , 'governorate': getGovernorateEnumID(this.governorateid) }
      });
  }
  getcolor(listid: number) {
    if (listid = 1) {
      this.color = { 'background-color': 'red!important' }
    }
    else {
      this.color = { 'background-color': 'green!important' }
    }
  }

  allcheck() {
    this.governorateid != null;
  }
  propertyFilter(data: any) {
    this.mumtalikatiservic.postPropertyFilter(data)
      .then((data) => {
        if (data) {
          this.ownerPropertyFilter = data
        }
      })
      .catch((error) => {
        console.error(error);
      }
      );
  }
}