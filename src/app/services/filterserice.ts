import { Injectable } from "@angular/core";
import { SetFiltersServive } from "./setfilters.servive";
@Injectable({ providedIn: 'root' })
export class FilterService {
    constructor(private setupFilterServive: SetFiltersServive) { }
    getPurposedesc(desc: string) {
        const purposedese=this.setupFilterServive.getListingPurpose();
        if(purposedese){
            const deselist = purposedese.find(x => x.desc == desc);
            return deselist?.listingPurposeType
        }
      return null;
    }
    getPurposeid(id: number) {
        const purposeid=this.setupFilterServive.getListingPurpose();
        if(purposeid){
            const listid = purposeid.find(x => x.listingPurposeType == id);
            return listid?.desc
        }
        return null;
    }
    getGovernorateDesc(desc: string) {
        const governorateDesc=this.setupFilterServive.getGovernorate();
        if(governorateDesc){
            const deselist = governorateDesc.find(x => x.name == desc);
            return deselist?.id
        }
       return null;
    }
    getGovernorateid(id: number) {
        const governorateid=this.setupFilterServive.getGovernorate();
        if(governorateid){
            const deselist = governorateid.find(x => x.id === id);
            return deselist?.name
        }
       return null;
    }
    getPropertytMasterTypedesc(desc: string) {
        const masterTypedesc=this.setupFilterServive.getPropertyMasterType();
        if(masterTypedesc){
            const deselist = masterTypedesc.find(x => x.desc == desc)
            return deselist?.masterType
        }
      return null;
    }
    getPropertytMasterTypeid(id: number) {
        const propertytMasterTypeid=this.setupFilterServive.getPropertyMasterType();
        if(propertytMasterTypeid){
            const deselist = propertytMasterTypeid.find(x => x.masterType == id)
            return deselist?.desc
        }
       return null;
    }
    getPropertytMasterSubTypedesc(desc: string) {
        const PropertytMasterSubTypedesc=this.setupFilterServive.getPropertySubType();
        if(PropertytMasterSubTypedesc){
            const deselist = PropertytMasterSubTypedesc.find(x => x.propertySubType.desc == desc)
            return deselist?.propertySubTypeID
        }
        return null;
    }
    getPropertytMasterSubTypeid(id: number) {
        const propertytMasterSubType=this.setupFilterServive.getPropertySubType();
        if(propertytMasterSubType){
            const deselist = propertytMasterSubType.find(x => x.propertySubType.subType == id)
            return deselist?.propertySubType?.desc
        }
        return null;
    }
    getPropertytUnitCategorydesc(desc: string) {

        const unitdese =this.setupFilterServive.getUnitCategory();
        if(unitdese){
            const deselist = unitdese.find(x => x.desc == desc)
            return deselist?.unitCategory
        }
       return null;
    }
    getPropertytUnitCategoryid(id: number) {
        const unitCategories = this.setupFilterServive.getUnitCategory();
        if (unitCategories) {
            const deselist = unitCategories.find(x => x.unitCategory === id);
            return deselist?.desc;
        }
        return null;
        // const deselist = this.setupFilterServive.getUnitCategory().find(x => x.unitCategory == id)
        // return deselist?.desc   
    }
    getStatusbyID(id: number) {
        const statuslist=this.setupFilterServive.getstatus();
        if(statuslist){
            const deselist = statuslist.find(x => x.statusCode == id)
            return deselist?.desc;
        }
        return null;
    }

}