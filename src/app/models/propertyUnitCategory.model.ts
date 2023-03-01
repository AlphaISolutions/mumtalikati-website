import { BaseEntity } from "./base-entity.model";
import { PropertyUnitCategoryEnum } from "./enums";

export class PropertyUnitCategory extends BaseEntity {
    unitCategory!: PropertyUnitCategoryEnum;
    desc!: string;
    url!: string;
}

