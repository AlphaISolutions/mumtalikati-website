import { BaseEntity } from "./base-entity.model";

export class Governorate extends BaseEntity {
    name!: string;
    shortname!: string;
    code!: string;
    countryID!: number | null;
    country!: string |null;
    id!:number | null;
}