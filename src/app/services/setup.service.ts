import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { Governorate } from "../models/governorate.model";
import { ListingPurpose } from "../models/listing-purpose.model";
import { PropertyMasterType } from "../models/property-master-type.model";
import { PropertyMasterSubType } from "../models/propertyMasterSubType .model";
import { PropertySubType } from "../models/propertySubType.model";
import { PropertyUnitCategory } from "../models/propertyUnitCategory.model";
import { Faqs } from "../models/faq.model";
import { Status } from "../models/status.model";

@Injectable({
    providedIn: 'root'
  })
  export class SetupService{
    constructor(private http: HttpClient) { }
  
    async getlistingpurposeset(): Promise<ListingPurpose[]> {

        return await firstValueFrom(this.http
          .get<ListingPurpose[]>(
            `@mumtalikati-api/Setup/GetListingPurpose`
          )).then(res => res as ListingPurpose[]).catch(err => { return Promise.reject(err) });
      }
      async  getPropertyMasterTypes(): Promise<PropertyMasterType[]> {
        return await firstValueFrom(this.http
          .get<PropertyMasterType[]>(
            `@mumtalikati-api/Setup/GetPropertyMasterTypes`
          )).then(res => res as PropertyMasterType[]).catch(err => { return Promise.reject(err) });
      }
      async  getPropertySubTypes(): Promise<PropertyMasterSubType[]> {
        return await firstValueFrom(this.http
          .get<PropertyMasterSubType[]>(
            `@mumtalikati-api/Setup/GetPropertyMasterSubTypesIncludingDetails`
          )).then(res => res as PropertyMasterSubType[]).catch(err => { return Promise.reject(err) });
      }
      async  getPropertyUnitCategoryTypes(): Promise<PropertyUnitCategory[]> {
        return await firstValueFrom(this.http
          .get<PropertyUnitCategory[]>(
            `@mumtalikati-api/Setup/PropertyUnitCategoryTypes`
          )).then(res => res as PropertyUnitCategory[]).catch(err => { return Promise.reject(err) });
      }
      async  getGovernorate(): Promise<Governorate[]> {
        return await firstValueFrom(this.http
          .get<Governorate[]>(
            `@mumtalikati-api/Setup/GetGovernorate`
          )).then(res => res as Governorate[]).catch(err => { return Promise.reject(err) });
      }
      async  getFaq(): Promise<Faqs[]> {
        return await firstValueFrom(this.http
          .get<Faqs[]>(
            `@mumtalikati-api/FAQS/ReadCSV`
          )).then(res => res as Faqs[]).catch(err => { return Promise.reject(err) });
      }
      async  getStatus(): Promise<Status[]> {
        return await firstValueFrom(this.http
          .get<Status[]>(
            `@mumtalikati-api/Setup/GetStatus`
          )).then(res => res as Status[]).catch(err => { return Promise.reject(err) });
      }
  }
