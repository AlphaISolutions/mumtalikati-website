import { Injectable } from '@angular/core';
import { SetupService } from './setup.service';
import { ListingPurpose } from '../models/listing-purpose.model';
import { PropertyUnitCategory } from '../models/propertyUnitCategory.model';
import { Governorate } from '../models/governorate.model';
import { PropertyMasterType } from '../models/property-master-type.model';
import { PropertyMasterSubType } from '../models/propertyMasterSubType .model';

@Injectable({
    providedIn: 'root'
})
export class SetFiltersServive {

    constructor(private setupService: SetupService) {

    }
    startSession(purposedata: any, propertymasterdata: any, propertysubTypedata: any, UnitCategorydata: any, governoratedata: any) {

        localStorage.setItem('listingpupose', JSON.stringify(purposedata));
        localStorage.setItem('propertymasterType', JSON.stringify(propertymasterdata));
        localStorage.setItem('propertysubType', JSON.stringify(propertysubTypedata));
        localStorage.setItem('propertyUnitCategoryType', JSON.stringify(UnitCategorydata));
        localStorage.setItem('governorate', JSON.stringify(governoratedata));

    }
    stopSession() {
        localStorage.removeItem('listingpupose');
        localStorage.removeItem('propertymasterType');
        localStorage.removeItem('propertysubType');
        localStorage.removeItem('propertyUnitCategoryType');
        localStorage.removeItem('governorate');
    }

    getListingPurpose(): ListingPurpose[] {

        let tempData = JSON.parse(localStorage.getItem('listingpupose')!);
        if (!tempData) {
            this.setupService.getlistingpurposeset().then((data) => {
                tempData=data
                this.setListingPurpose(data)
              return tempData;
            })
        }
        return tempData;
    }

    setListingPurpose(data: any) {

        localStorage.setItem('listingpupose', JSON.stringify(data));
    }


    getPropertyMasterType(): PropertyMasterType[] {

        let tempDatas = JSON.parse(localStorage.getItem('propertymasterType')!);
        if (!tempDatas) {
            this.setupService.getPropertyMasterTypes().then((data) => {
                tempDatas=data
                this.setPropertyMasterType(data)
              return tempDatas;
            })
        }
        return tempDatas;
    }
    setPropertyMasterType(data: any) {
        localStorage.setItem('propertymasterType', JSON.stringify(data));
    }

    getPropertySubType(): PropertyMasterSubType[] {

        let tempData = JSON.parse(localStorage.getItem('propertysubType')!);
        if (!tempData) {
            this.setupService.getPropertySubTypes().then((data) => {
                tempData=data
                this.setPropertySubType(data)
              return tempData;
            })
        }
        return tempData;



    }
    setPropertySubType(data: any) {
        localStorage.setItem('propertysubType', JSON.stringify(data));
    }

    getUnitCategory(): PropertyUnitCategory[] {

        let tempDatass = JSON.parse(localStorage.getItem('propertyUnitCategoryType')!);
        if (!tempDatass) {
            this.setupService.getPropertyUnitCategoryTypes().then((data) => {
                tempDatass=data
                this.setUnitCategory(data)
              return tempDatass;
            })
        }

        return tempDatass;



    }
    setUnitCategory(data: any) {
        localStorage.setItem('propertyUnitCategoryType', JSON.stringify(data));
    }
    getGovernorate(): Governorate[] {
        let tempData = JSON.parse(localStorage.getItem('governorate')!);
        if (!tempData) {
            this.setupService.getGovernorate().then((data) => {
              tempData=data
              this.setGovernorate(data)
              return tempData;
            })
        }

        return tempData;



    }
    setGovernorate(data: any) {

        localStorage.setItem('governorate', JSON.stringify(data));
    }
}
