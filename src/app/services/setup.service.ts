import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { ListingPurpose } from "../models/listing-purpose.model";
import { PropertyMasterType } from "../models/property-master-type.model";
import { PropertySubType } from "../models/propertySubType.model";

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
      async  getPropertySubTypes(): Promise<PropertySubType[]> {
        return await firstValueFrom(this.http
          .get<PropertySubType[]>(
            `@mumtalikati-api/Setup/PropertySubTypes`
          )).then(res => res as PropertySubType[]).catch(err => { return Promise.reject(err) });
      }
      
  }
