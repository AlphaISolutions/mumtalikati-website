import { BaseEntity } from "./base-entity.model";

export class Feature extends BaseEntity {
    featureTypesID!: number | null;
    featureTypes!: null;
    desc!: string;
}
