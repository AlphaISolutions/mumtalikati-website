import { BaseEntity } from "../models/base-entity.model";
import { PropertySubTypeEnum } from "./enums";

export interface PropertySubType extends BaseEntity {
    subType: PropertySubTypeEnum;
    desc: string;
    url: string;
}

