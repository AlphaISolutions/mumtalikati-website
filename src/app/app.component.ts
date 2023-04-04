import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { forkJoin, map } from 'rxjs';

import { Governorate } from './models/governorate.model';
import { ListingPurpose } from './models/listing-purpose.model';
import { PropertyMasterType } from './models/property-master-type.model';
import { PropertyMasterSubType } from './models/propertyMasterSubType .model';
import { PropertyUnitCategory } from './models/propertyUnitCategory.model';
import { SetFiltersServive } from './services/setfilters.servive';
import { SetupService } from './services/setup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // standalone:true,
  // imports:[CommonModule,RouterOutlet]
})
export class AppComponent {
  title = 'mumtalikati-website';
  loading: boolean = false;
  listingpupose: ListingPurpose[] = [];
  propertymasterType: PropertyMasterType[] = []
  propertysubType: PropertyMasterSubType[] = []
  propertyUnitCategoryType: PropertyUnitCategory[] = [];
  governorate: Governorate[] = [];
  constructor(private setservice: SetupService, private setupFilterServive: SetFiltersServive) { }
  showfooter: boolean = false;
  async ngOnInit() {
    this.getlistingPurpose();
    this.getPropertyMasterType();
    this.getPropertySubType();
    this.getPropertyUnitCategoryType();
    this.getgovernorates();
    this.getFilterdata()
  }
  async getlistingPurpose() {

    this.setservice.getlistingpurposeset()
      .then((data) => {
        if (data) {
          this.listingpupose = data

        }
        //  this.loading=false;
      })
      .catch((error) => {
        // this.loading=false;
        console.error(error);
      });
  }
  async getPropertyMasterType() {

    this.setservice.getPropertyMasterTypes()
      .then((data) => {
        if (data) {
          this.propertymasterType = data
        }
        // this.loading=false;
      })
      .catch((error) => {
        // this.loading=false;
        console.error(error);
      });
  }
  async getPropertySubType() {

    this.setservice.getPropertySubTypes()
      .then((data) => {
        if (data) {
          this.propertysubType = data
        }
        // this.loading=false;
      })
      .catch((error) => {
        // this.loading=false;
        console.error(error);
      });
  }
  async getPropertyUnitCategoryType() {

    this.setservice.getPropertyUnitCategoryTypes()
      .then((data) => {
        if (data) {
          this.propertyUnitCategoryType = data
        }
        // this.loading=false;
      })
      .catch((error) => {
        // this.loading=false;
        console.error(error);
      });
  }
  async getgovernorates() {

    this.setservice.getGovernorate()
      .then((data) => {
        if (data) {
          this.governorate = data

        }
        // this.loading=false;
      })
      .catch((error) => {
        this.loading = false;
        console.error(error);
      });
  }
  getFilterdata() {
    this.loading = true;
    forkJoin({
      propertyListPurpose: this.setservice.getlistingpurposeset(),
      propertyMasterType: this.setservice.getPropertyMasterTypes(),
      propertyPropertySubType: this.setservice.getPropertySubTypes(),
      propertyUnitCategoryTypes: this.setservice.getPropertyUnitCategoryTypes(),
      propertyGovernorates: this.setservice.getGovernorate(),
    
    }).pipe(
      map(response => {
        return response;
      })
    ).subscribe((data) => {
      this.listingpupose = <Array<any>>data.propertyListPurpose;
      this.propertymasterType = <Array<any>>data.propertyMasterType;
      this.propertysubType = <Array<any>>data.propertyPropertySubType;
      this.propertyUnitCategoryType = <Array<any>>data.propertyUnitCategoryTypes;
      this.governorate = <Array<any>>data.propertyGovernorates;
      // this.setupFilterServive.startSession(
      //   this.listingpupose, this.propertymasterType, this.propertysubType, this.propertyUnitCategoryType, this.governorate)
      this.loading = false;
    }, error => {
      this.loading = false;
      console.error(error);
    });
  }
}
