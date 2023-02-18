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
export function getstatusType(stutuss: number) {
    switch (stutuss) {
        case 1:
            return 'Active';
            return 'Others';
        default:
            return "";
    }
}