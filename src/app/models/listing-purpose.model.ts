import { BaseEntity } from ".././models/base-entity.model";
import { ListingPurposeTypeEnum } from "./enums";

export class ListingPurpose extends BaseEntity {
    listingPurposeType!: ListingPurposeTypeEnum;
    desc!: string;
}


