import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class SetFiltersServive {
    constructor() {

    }
    startSession(purposedata: any, propertymasterdata: any, propertysubTypedata: any, UnitCategorydata: any, governoratedata: any) {
        localStorage.setItem('listingpupose', purposedata);
        localStorage.setItem('propertymasterType', propertymasterdata);
        localStorage.setItem('propertysubType', propertysubTypedata);
        localStorage.setItem('propertyUnitCategoryType', UnitCategorydata);
        localStorage.setItem('governorate', governoratedata);

    }
    stopSession() {
        localStorage.removeItem('listingpupose');
        localStorage.removeItem('propertymasterType');
        localStorage.removeItem('propertysubType');
        localStorage.removeItem('propertyUnitCategoryType');
        localStorage.removeItem('governorate');
    }
    getListingPurpose():any {
        return localStorage.getItem('listingpupose');
    }
    getPropertyMasterType() {
        return localStorage.getItem('propertymasterType');
    }
    getPropertySubType() {
        return localStorage.getItem('propertysubType');
    }
    getUnitCategory() {
        return localStorage.getItem('propertyUnitCategoryType');
    }
    getGovernorate():any {
        return localStorage.getItem('governorate');
    }
}
