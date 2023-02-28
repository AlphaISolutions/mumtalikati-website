import { BaseEntity } from "./base-entity.model";
import { PropertyMasterType } from "./property-master-type.model";
import { PropertySubType } from "./propertySubType.model";

export class PropertyMasterSubType extends BaseEntity {
    propertyMasterTypeID!: number | null;
    propertyMasterType!: PropertyMasterType;
    propertySubTypeID!: number | null;
    propertySubType!: PropertySubType;
}