export enum Status {
    Active = 1,
    Inactive = 2,
    RentedOut = 3,
    Sold = 4,
    Available = 5,
    DisableAutoVacancy = 6,
    EnableAutoVacancy = 7,
    Pending = 8,
    Negotiation = 9,
    Renewable = 10,
    Approved = 11,
    Rejected = 12,
    PartiallyOccupied = 13,
    Expired = 14
}
export enum ListingPurposeTypeEnum {
    Rent = 1,
    Buy = 2
}
export enum PropertyMasterTypeEnum {
    Residential = 1,
    Commercial = 2,
    ResidentalCommercial = 3
}
export enum PropertySubTypeEnum {
    Building = 1,
    TownHouse = 2,
    LowerPortion = 3,
    UpperPortion = 4,
    PentHouse = 5,
    Villa = 6,
    Room = 7,
    Flat = 8,
    MixUse = 9,
    WareHouse = 10,
    Shop = 11,
    BusinessCenter = 12,
    Factory = 13,
    Hall = 14,
    Plot = 15,
    Project = 16
}
export enum PropertyUnitCategoryEnum {
    O1BHK = 1,
    O2BHK = 2,
    O3BHK = 3,
    O4BHK = 4,
    O5BHK = 5,
    Shop = 6,
    Office = 7,
    WareHouse = 8,
    Factory = 9,
    Hall = 10,
    BusinessCenter = 11,
    WholeBuilding = 12
}
export enum PropertyType {
    Parent = 1,
    Child = 2
}
export function getsubType(proertycategoryId: number){
    switch (proertycategoryId) { 
case 3:
    return 'Building ';
    return 'Building ';
    return 'Building ';
    return 'Building ';
    default:
        return "";
    }
 
}
export function getstatusType(stutuss: number) {
    switch (stutuss) {
        case 1:
            return 'Active';
            return 'Others';
        default:
            return "";
    }
}