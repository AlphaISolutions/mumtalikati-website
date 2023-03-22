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
export function listingPurposeTypeEnum(listingPurposeTypeId: number) {
    switch (listingPurposeTypeId) {
        case 1:
            return 'Rent';
        case 2:
            return 'Buy';

        default:
            return "Unknown";
    }

}
export function propertyMasterTypeEnum(propertyMasterTypeID: number) {
    switch (propertyMasterTypeID) {
        case 1:
            return 'Residential';
        case 2:
            return 'Commercial';
        case 3:
            return 'ResidentalCommercial';
        default:
            return 'All';
    }

}
export function getstatusType(stutuss: number) {
    switch (stutuss) {
        case 1:
            return 'Active';
        case 2:
            return 'Inactive';
        case 3:
            return 'RentedOut';
        case 4:
            return 'Sold';
        case 5:
            return 'Available';
        case 6:
            return 'DisableAutoVacancy';
        case 7:
            return 'EnableAutoVacancy';
        case 8:
            return 'Pending';
        case 9:
            return 'Negotiation';
        case 10:
            return 'Renewable';
        case 11:
            return 'Approved';
        case 12:
            return 'Rejected';
        case 13:
            return 'PartiallyOccupied';
        case 14:
            return 'Expired';

        default:
            return "Unknown";
    }

}
export function getPropertyUnitCategoryEnum(unitcatID: number) {
    switch (unitcatID) {
        case 1:
            return '1BHK';
        case 2:
            return '2BHK';
        case 3:
            return '3BHK';
        case 4:
            return '4BHK';
        case 5:
            return '5BHK';
        case 6:
            return 'Shop';
        case 7:
            return 'Office';
        case 8:
            return 'WareHouse';
        case 9:
            return 'Factory';
        case 10:
            return 'Hall';
        case 11:
            return 'BusinessCenter';
        case 12:
            return 'WholeBuilding';
        default:
            return '';
    }

}
export function propertySubTypeEnum(subTypeId: any) {
    switch (subTypeId) {
        case 1:
            return 'Building';
        case 2:
            return 'TownHouse';
        case 3:
            return 'LowerPortion';
        case 4:
            return 'UpperPortion';
        case 5:
            return 'PentHouse';
        case 6:
            return 'Villa';
        case 7:
            return 'Room';
        case 8:
            return 'Flat';
        case 9:
            return 'MixUse';
        case 10:
            return 'WareHouse';
        case 11:
            return 'Shop';
        case 12:
            return 'BusinessCenter';
        case 13:
            return 'Factory';
        case 14:
            return 'Hall';
        case 15:
            return 'Plot';
        case 16:
            return 'Project';
        default:
            return '';
    }

}
