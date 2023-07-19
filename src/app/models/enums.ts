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
    return purpose[listingPurposeTypeId] || 1;

}
export function listingPurposeTypeEnumid(listingPurposeTypeId: number): string {
    var purpose = {
        1: "Rent",
        2: "Buy",
    }
    return purpose[listingPurposeTypeId] || "unknown";

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
export function propertyMasterTypeEnumid(listingPurposeTypeId: number): string {
    var purpose = {
        1: "Residential",
        2: "Commercial",
        3: "ResidentalCommercial",
    }
    return purpose[listingPurposeTypeId] || null;

}
export function propertyMasterTypeEnumstring(listingPurposeTypeId: number) {
    var purpose = {
        "Residential": 1,
        "Commercial": 2,
        "ResidentalCommercial": 3,
    }
    return purpose[listingPurposeTypeId] || null;

}
export function getPropertySubTypeEnum(subType: number) {
    var propertysubType = {
        'Building': 1,
        'TownHouse': 2,
        'LowerPortion': 3,
        'UpperPortion': 4,
        'PentHouse': 5,
        'Villa': 6,
        'Room': 7,
        'Flat': 8,
        'MixUse': 9,
        'WareHouse': 10,
        'Shop': 11,
        'BusinessCenter': 12,
        'Factory': 13,
        'Hall': 14,
        'Plot': 15,
        'Project': 16
    }
    return propertysubType[subType] || null;
}
export function getPropertySubTypeEnumID(subTypeID: number): string {
    var unitCategory = {
        1: 'Building',
        2: 'TownHouse',
        3: 'LowerPortion',
        4: 'UpperPortion',
        5: 'PentHouse',
        6: 'Villa',
        7: 'Room',
        8: 'Flat',
        9: 'MixUse',
        10: 'WareHouse',
        11: 'Shop',
        12: 'BusinessCenter',
        13: 'Factory',
        14: 'Hall',
        15: 'Plot',
        16: 'Project'
    }
    return unitCategory[subTypeID] || null;
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
export function getPropertyUnitCategoryEnum(unitcatID: number): string {
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
export function getPropertyUnitCategoryEnumstring(unitcatID: number) {
    var unitCategory = {
        '1BHK': 1,
        '2BHK': 2,
        '3BHK': 3,
        '4BHK': 4,
        '5BHK': 5,
        'Shop': 6,
        'Office': 7,
        'WareHouse': 8,
        'Factory': 9,
        'Hall': 10,
        'BusinessCenter': 11,
        'WholeBuilding': 12
    }
    return unitCategory[unitcatID] || null;
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
export function getPropertyUnitEnum(unitcatID: string) {
    var unitCategory = {
        'غرفة نوم واحدة': '1BHK',
        'اثنين من غرف نوم': '2BHK',
        'ثلاثة غرف نوم': '3BHK',
        'أربعة غرف نوم': '4BHK',
        'خمسة غرف نوم': '5BHK',
        'محل': 'Shop',
        'مكتب': 'Office',
        'مستودع': 'WareHouse',
        'مصنع': 'Factory',
        'قاعة': 'Hall',
        'بيزنس سنتر': 'BusinessCenter',
        'المبنى كله': 'WholeBuilding',
        '1BHK': 'غرفة نوم واحدة',
        '2BHK': 'اثنين من غرف نوم',
        '3BHK': 'ثلاثة غرف نوم',
        '4BHK': 'أربعة غرف نوم',
        '5BHK': 'خمسة غرف نوم',
        'Shop': 'محل',
        'Office': 'مكتب',
        'WareHouse': 'مستودع',
        'Factory': 'مصنع',
        'Hall': 'قاعة',
        'BusinessCenter': 'بيزنس سنتر',
        'WholeBuilding': 'المبنى كله'
    }
    return unitCategory[unitcatID] || "Unknown";
}
export function listingPurposelang(listingPurposeTypeId: string) {
    var purpose = {
        "Rent": "إيجار",
        "Buy": "يشتري",
        "يشتري": "Buy",
        "إيجار": "Rent"
    }
    return purpose[listingPurposeTypeId] || "Unknown";

}
export function getGovernorateEnumID(governorateID: number): string {
    var governorate = {
        1: 'Ad Dakhiliyah',
        2: 'Ad Dhahirah',
        3: 'Al Batinah North',
        4: 'Al Batinah South',
        5: 'Al Buraymi',
        6: 'Al Wusta',
        7: 'Ash Sharqiyah North',
        8: 'Ash Sharqiyah South',
        9: 'Dhofar',
        10: 'Muscat',
        11: 'Musandam',
    }
    return governorate[governorateID] || null;
}
export function getGovernorateEnum(governorateID: number) {
    var governorate = {
        'Ad Dakhiliyah': 1,
        'Ad Dhahirah': 2,
        'Al Batinah North': 3,
        'Al Batinah South': 4,
        'Al Buraymi': 5,
        'Al Wusta': 6,
        'Ash Sharqiyah North': 7,
        'Ash Sharqiyah South': 8,
        'Dhofar': 9,
        'Muscat': 10,
        'Musandam': 11,
    }
    return governorate[governorateID] || null;
}