import { prop } from "@rxweb/reactive-form-validators";

export class PropertyFilter {
    @prop()
    propertyMasterSubTypeID!: number | null;
    @prop()
    listingPurposesID!: number | null;
    @prop()
    propertyMasterTypeID!: number | null;
    @prop()
    gOVERNORATEID!:number |  null;
    wilayatID!: null;
    @prop(

    )
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
export class OwnerPropertyFilter {
    rowsIndex!: number | null;
    rownumberId!: number | null;
    propertyMasterID!: number | null;
    unitCategoryID!: number | null;
    listingPurposeID!: number | null;
    propertyMasterSubType!: number | null;
    propertyMasterName!: string | null;
    propertyUnitDescription!: string | null;
    rentPrice!: number | null;
    sellPrice!: number | null;
    addressStr!: string | null;
    landLordID!: number | null;
    totalCount!: number | null;
    plotNumber!: string | null;
    propertyMasterTypeID!: number | null;
    propertyUnitID!: number | null;
    unitName!: string | null;
    pageNumber!: number | null;
    rowsNumbers!: number | null;
    bedRoom!: number | null;
    bathRoom!: number | null;
    sqft!: number | null;
    contact!: string | null;
    imageString!: string | null;
}