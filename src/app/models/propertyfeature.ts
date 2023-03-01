import { BaseEntity } from "./base-entity.model";
import { PropertyType } from "./enums";
import { Feature } from "./feature";
import { PropertyMaster } from "./property-master";
import { PropertyUnitCategory } from "./propertyUnitCategory.model";

export class PropertyFeature extends BaseEntity  {
    propertyMasterID!: number | null;
    propertyMaster!: PropertyMaster;
    propertyUnitCategoryID!: number | null;
    propertyUnitCategory!: PropertyUnitCategory;
    featureID!: number | null;
    feature!: Feature;
    propertyTypes!: PropertyType;
}

