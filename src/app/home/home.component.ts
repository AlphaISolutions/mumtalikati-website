
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { assetUrl } from 'src/single-spa/asset-url';
import { Governorate } from '../models/governorate.model';
import { ListingPurpose } from '../models/listing-purpose.model';
import { SessionService } from '../services/sessionService';
import { SetFiltersServive } from '../services/setfilters.servive';
import { SetupService } from '../services/setup.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private setservice: SetupService, private router: Router ,private setFilterService:SetFiltersServive) { }
  loading: boolean = false;
  governorate: Governorate[] = [];
  listingpupose: ListingPurpose[] = [];
  public governorateid: number|null =null ;
  public listingPurposeType: number | null = 1;
  color: any
  toggle: any;
  isActive: boolean = false;
  page:boolean=true
  elementStyles: any = {
    'color': this.isActive ? 'green' : 'red'
  }
  getColorClass() {
    return this.isActive ? 'active' : 'inactive';
  }
  async ngOnInit() {
    let governorate=this.setFilterService.getGovernorate()
    if(governorate){
      this.governorate = governorate
    }
    else{
      this.getgovernorates();
    }
    let listpurpose=this.setFilterService.getListingPurpose()
    if(listpurpose){
      this.listingpupose=listpurpose;
    }else{
      this.getlistingPurpose();
    }
    this.getgovernorates();
    this.getlistingPurpose();
   
    if (this.toggle) {

      this.color = { 'background-color': 'white!important', 'color': 'black!important' }
    } else {
      this.color = { 'background-color': 'transparent!important' }
    }
  }

  async getgovernorates() {
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
    console.log(id)
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
  find() {
    this.router.navigate(['propertydetails'],
      {
        state: { 'listingPurposeID': this.listingPurposeType, 'governorateid': this.governorateid }
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

}