import { prop } from "@rxweb/reactive-form-validators";

export class PropertyFilter {
    @prop()
    propertyMasterSubTypeID!: number | null;
    @prop()
    listingPurposesID!: number | null;
    @prop()
    propertyMasterTypeID!: number | null;
    gOVERNORATEID!: number | null;
    wilayatID!: number | null;
    @prop()
    minPrice!: number | null;
    @prop()
    maxPrice!: number | null;
    @prop()
    propertyCategory!: number | null;
    @prop()
    pageNumber!: number | null;
    @prop()
    rowsNumbers!: number | null;
}