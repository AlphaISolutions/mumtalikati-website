export enum StatusCodeEnum {
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
    Expired = 14,
    PartiallyRent = 15,
    Paid = 16
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
export enum UserTypeEnum {
    Landlord = 1,
    Tenant = 2,
    ServiceProvider = 3,
    RealStateAgent = 4,
    Corporate = 5,
    Admin = 6
}
export enum PropertyType {
    Parent = 1,
    Child = 2
}
export function listingPurposeTypeEnum(listingPurposeTypeId: number): string {
    var purpose = {
        1: "Rent",
        2: "Sale"
    }
    return purpose[listingPurposeTypeId] || "Unknown";
}
export function listingPurposeTypeEnumSting(listingPurposeTypeId: string) {

    var purpose = {
        "Rent": 1,
        "Buy": 2,
    }
    return purpose[listingPurposeTypeId] || "Unknown";

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
            return '';
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
        case 15:
            return 'PartiallyRent';
        case 16:
            return 'Paid';

        default:
            return "Unknown";
    }

}
export function getPropertyUnitCategoryEnum(unitcatID: number) {
    var unitCategory = {
        1: '1BHK',
        2: '2BHK',
        3: '3BHK',
        4: '4BHK',
        5: '5BHK',
        6: 'Shop',
        7: 'Office',
        8: 'WareHouse',
        9: 'Factory',
        10: 'Hall',
        11: 'BusinessCenter',
        12: 'WholeBuilding'
    }
    return unitCategory[unitcatID] || "Unknown";
}
export function propertySubTypeEnum(subTypeId: any) {
    switch (subTypeId) {
        case 1:
            return 'مبنى';
        case 2:
            return 'تاون هاوس';
        case 3:
            return 'الجزء السفلي';
        case 4:
            return 'الجزء العلوي';
        case 5:
            return 'كنة';
        case 6:
            return 'فيلا';
        case 7:
            return 'غرفة';
        case 8:
            return 'مستوي';
        case 9:
            return 'ميكس';
        case 10:
            return 'مستودع';
        case 11:
            return 'محل';
        case 12:
            return 'بيزنس سنتر';
        case 13:
            return 'مصنع';
        case 14:
            return 'قاعة';
        case 15:
            return 'حبكة';
        case 16:
            return 'مشروع';
        default:
            return '';
    }

}
