import { BaseEntity } from "../models/base-entity.model";
import { PropertySubTypeEnum } from "./enums";

export class PropertySubType extends BaseEntity {
    subType!: PropertySubTypeEnum;
    desc!: string;
    url!: string;
}

