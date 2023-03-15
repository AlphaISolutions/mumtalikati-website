import { Injectable } from '@angular/core';
import { SetupService } from './setup.service';


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

    getListingPurpose(): any {
      
        let tempData = JSON.parse(localStorage.getItem('listingpupose')!);
    
       return tempData;
    }

    setListingPurpose(data: any) {
       
        localStorage.setItem('listingpupose', JSON.stringify(data));
    }


    getPropertyMasterType():any {
   
        let tempDatas = JSON.parse(localStorage.getItem('propertymasterType')!);
      
        return tempDatas;
    }
   setPropertyMasterType(data:any){
    localStorage.setItem('propertymasterType', JSON.stringify(data));
   }

    getPropertySubType() :any{
     
        let tempData = JSON.parse(localStorage.getItem('propertysubType')!);
      
            return tempData;
        
        
     
    }
    setPropertySubType(data:any){
        localStorage.setItem('propertysubType', JSON.stringify(data));
    }

    getUnitCategory():any {
    
        let tempDatass = JSON.parse(localStorage.getItem('propertyUnitCategoryType')!);
        
      
            return tempDatass;
    
  
        
    }
    setUnitCategory(data:any){
        localStorage.setItem('propertyUnitCategoryType', JSON.stringify(data));
    }
    getGovernorate(): any {
        let tempData = JSON.parse(localStorage.getItem('governorate')!);
       
      
            return tempData;
     
       
      
    }
    setGovernorate(data:any){
      
        localStorage.setItem('governorate', JSON.stringify(data));
    }
}
