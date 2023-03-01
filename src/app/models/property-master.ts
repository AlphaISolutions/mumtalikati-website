import { BaseEntity } from "./base-entity.model";
import { ListingPurpose } from "./listing-purpose.model";
import { PropertyMasterType } from "./property-master-type.model";
import { PropertySubType } from "./propertySubType.model";

export class PropertyMaster extends BaseEntity {
    landLordID!: number | null;
    user!: null;
    propertyMasterTypeID!: number | null;
    propertyMasterType!: PropertyMasterType;
    propertyMasterSubTypeID!: number | null;
    propertyMasterSubType!: PropertySubType;
    listingPurposeID!: number | null;
    listingPurpose!: ListingPurpose;
    addressID!: number | null;
    address!: null;
    residentialUnits!: number | null;
    commercialUnits!: number | null;
    builtYear!: number | null;
    numberofFloors!: number | null;
    plotNumber!: string;
    buildingNumber!: string;
    name!: string;
    description!: string;
    propertyStatusID!: number | null;
    propertyStatus!: null;
}
