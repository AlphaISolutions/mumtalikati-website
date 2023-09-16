import { Injectable } from '@angular/core';
import { SetupService } from './setup.service';
import { ListingPurpose } from '../models/listing-purpose.model';
import { PropertyUnitCategory } from '../models/propertyUnitCategory.model';
import { Governorate } from '../models/governorate.model';
import { PropertyMasterType } from '../models/property-master-type.model';
import { PropertyMasterSubType } from '../models/propertyMasterSubType .model';
import { State } from '../models/state.model';
import { Status } from '../models/status.model';
import { WilayatModel } from '../models/wilaya';

@Injectable({
    providedIn: 'root'
})
export class SetFiltersServive {

    constructor(private setupService: SetupService) {

    }
    startSession(purposedata: any, propertymasterdata: any, propertysubTypedata: any, UnitCategorydata: any, governoratedata: any, Statusdata: any,wilayadata) {
        localStorage.setItem('listingpupose', JSON.stringify(purposedata));
        localStorage.setItem('propertymasterType', JSON.stringify(propertymasterdata));
        localStorage.setItem('propertysubType', JSON.stringify(propertysubTypedata));
        localStorage.setItem('propertyUnitCategoryType', JSON.stringify(UnitCategorydata));
        localStorage.setItem('governorate', JSON.stringify(governoratedata));
        localStorage.setItem('wilaya', JSON.stringify(wilayadata));
        localStorage.setItem('getStatus', JSON.stringify(Statusdata));

    }
    stopSession() {
        localStorage.removeItem('listingpupose');
        localStorage.removeItem('propertymasterType');
        localStorage.removeItem('propertysubType');
        localStorage.removeItem('propertyUnitCategoryType');
        localStorage.removeItem('governorate');
        localStorage.removeItem('getStatus');
        localStorage.removeItem('wilaya');
    }

    getListingPurpose(): ListingPurpose[] {
        let tempData = JSON.parse(localStorage.getItem('listingpupose')!);
        if (!tempData) {
            this.setupService.getlistingpurposeset().then((data) => {
                tempData = data
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
                tempDatas = data
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
                tempData = data
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
                tempDatass = data
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
                tempData = data
                this.setGovernorate(data)
                return tempData;
            })
        }
        return tempData;
    }
    setGovernorate(data: any) {
        localStorage.setItem('governorate', JSON.stringify(data));
    }
    getwilaya(): WilayatModel[] {
        let tempData = JSON.parse(localStorage.getItem('wilaya')!);
        if (!tempData) {
            this.setupService.getWilaya().then((data) => {
                tempData = data
                this.setwilaya(data)
                return tempData;
            })
        }
        return tempData;
    }
    setwilaya(data: any) {
        localStorage.setItem('wilaya', JSON.stringify(data));
    }
    getsharedmodel(): State {
        let model = JSON.parse(localStorage.getItem('state')!);
        if (model) {
            this.setsharedmodel(model)
            return model;
        }
        return model;
    }
    setsharedmodel(data: any) {
        localStorage.setItem('state', JSON.stringify(data));
    }
    getstatus(): Status[] {
        let tempData = JSON.parse(localStorage.getItem('getStatus')!);
        if (!tempData) {
            this.setupService.getStatus().then((data) => {
                tempData = data
                this.setstatus(data)
                return tempData;
            })
        }
        return tempData;
    }
    setstatus(data: any) {
        localStorage.setItem('getStatus', JSON.stringify(data));
    }
}
