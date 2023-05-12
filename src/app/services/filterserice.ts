import { Injectable } from "@angular/core";
import { SetFiltersServive } from "./setfilters.servive";
@Injectable({ providedIn: 'root' })
export class FilterService {
    constructor(private setupFilterServive: SetFiltersServive) { }
    getPurposedesc(desc: string) {
        const deselist = this.setupFilterServive.getListingPurpose().find(x => x.desc == desc);
        return deselist?.listingPurposeType
    }
    getPurposeid(id: number) {
        const listid = this.setupFilterServive.getListingPurpose().find(x => x.listingPurposeType == id);
        return listid?.desc
    }
    getGovernorateDesc(desc: string) {
        const deselist = this.setupFilterServive.getGovernorate().find(x => x.name == desc);
        return deselist?.id
    }
    getGovernorateid(id: number) {
        const deselist = this.setupFilterServive.getGovernorate().find(x => x.id === id);
        return deselist?.name
    }
    getPropertytMasterTypedesc(desc: string) {
        const deselist = this.setupFilterServive.getPropertyMasterType().find(x => x.desc == desc)
        return deselist?.masterType
    }
    getPropertytMasterTypeid(id: number) {
        const deselist = this.setupFilterServive.getPropertyMasterType().find(x => x.masterType == id)
        return deselist?.desc
    }
    getPropertytMasterSubTypedesc(desc: string) {
        const deselist = this.setupFilterServive.getPropertySubType().find(x => x.propertySubType.desc == desc)
        return deselist?.propertySubTypeID
    }
    getPropertytMasterSubTypeid(id: number) {
        const deselist = this.setupFilterServive.getPropertySubType().find(x => x.propertySubType.subType == id)
        return deselist?.propertySubType?.desc
    }
    getPropertytUnitCategorydesc(desc: string) {  
        const deselist = this.setupFilterServive.getUnitCategory().find(x => x.desc == desc)
        return deselist?.unitCategory
    }
    getPropertytUnitCategoryid(id: number) {
        const deselist = this.setupFilterServive.getUnitCategory().find(x => x.unitCategory == id)
        return deselist?.desc   
    }


}