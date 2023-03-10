import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { assetUrl } from 'src/single-spa/asset-url';
import { Governorate } from '../models/governorate.model';
import { ListingPurpose } from '../models/listing-purpose.model';
import { SetupService } from '../services/setup.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private setservice: SetupService,private router: Router) { }
  loading: boolean = false;
  governorate: Governorate[] = [];
  listingpupose: ListingPurpose[] = [];
  governorateid!: number;
public  listingPurposeType: number=1;
color:any
 toggle=1;
  async ngOnInit() {
    this.getgovernorates();
    this.getlistingPurpose();
    if (this.toggle) {

      this.color={'background-color':'white!important' ,'color':'black!important'}
    } else {
      this.color={'background-color':'transparent!important'}
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
  find(){
    this.router.navigate(['propertydetails'],
    { 
    state: { 'listingPurposeID': this.listingPurposeType ,'governorateid':this.governorateid} });
  }

  // enableDisableRule() {
  //   this.toggle = !this.toggle;
  //   this.listingPurposeType = this.toggle ? 1 : 1;
  // }


}
