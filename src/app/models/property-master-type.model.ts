import { BaseEntity } from ".././models/base-entity.model";
import { PropertyMasterTypeEnum } from "./enums";

export class PropertyMasterType extends BaseEntity {
    masterType!: PropertyMasterTypeEnum;
    desc!: string;
    url!: string;
}

