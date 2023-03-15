import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Governorate } from './models/governorate.model';
import { ListingPurpose } from './models/listing-purpose.model';
import { PropertyMasterType } from './models/property-master-type.model';
import { PropertyMasterSubType } from './models/propertyMasterSubType .model';
import { PropertyUnitCategory } from './models/propertyUnitCategory.model';
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
  constructor(private setservice: SetupService) { }
  async ngOnInit() {
    this.getlistingPurpose();
    this.getPropertyMasterType();
    this.getPropertySubType();
    this.getPropertyUnitCategoryType();
    this.getgovernorates();
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
          this.propertyUnitCategoryType = data
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async getgovernorates() {
    this.loading = true;
    this.setservice.getGovernorate()
      .then((data) => {
        if (data) {
          this.governorate = data
        }

      })
      .catch((error) => {

        console.error(error);
      });
  }
}
