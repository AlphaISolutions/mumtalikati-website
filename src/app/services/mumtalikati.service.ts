import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { RentalUnitDetail } from '../models/rental-unit-detail.model';
import { ListingPurpose } from '../models/listing-purpose.model';
import { OwnerPropertyMasterIndiviualUnits } from '../models/ownerPropertyMasterIndiviualUnits.model';
import { OwnerRentDetail } from '../models/ownerRentDetailmodel';
import { SendEmail } from '../models/sendemail.model';
import { PropertyFeature } from '../models/propertyfeature';
import { OwnerPropertyFilter, PropertyFilter } from '../models/PropertyFilter.model';
@Injectable({
  providedIn: 'root'
})
export class MumtalikatiService {

  constructor(private http: HttpClient) { }
  async getPropertyDetailIndex(propertyMasterTypeID: number, propertyMasterSubTypeID: number, listingPurposesID: number, pageNumber: number, rowsNumbers: number): Promise<RentalUnitDetail[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("PropertyMasterTypeID", propertyMasterTypeID);
    queryParams = queryParams.append("PropertyMasterSubTypeID", propertyMasterSubTypeID);
    queryParams = queryParams.append("ListingPurposesID", listingPurposesID);
    queryParams = queryParams.append("PageNumber", pageNumber);
    queryParams = queryParams.append("RowsNumbers", rowsNumbers);
    return await firstValueFrom(this.http
      .get<RentalUnitDetail[]>(
        `@mumtalikati-api/PropertyDetail/GetPropertyDetail`, { params: queryParams }
      )).then(res => res as RentalUnitDetail[]).catch(err => { return Promise.reject(err) });
  }
  async getPropertyDetailCount(propertyMasterTypeID: number, propertyMasterSubTypeID: number, listingPurposesID: number): Promise<Number> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("PropertyMasterTypeID", propertyMasterTypeID);
    queryParams = queryParams.append("PropertyMasterSubTypeID", propertyMasterSubTypeID);
    queryParams = queryParams.append("ListingPurposesID", listingPurposesID);

    return await firstValueFrom(this.http
      .get<Number>(
        `@mumtalikati-api/PropertyDetail/GetPropertyDetailCount`, { params: queryParams }
      )).then(res => res as Number).catch(err => { return Promise.reject(err) });
  }
  async getPropertyMasterIndiviualsUnit(PropertyMasterID: number, listingpurposeID: number, UnitCategoryID: number, status: number, pageNumber: number, rowsNumbers: number): Promise<OwnerPropertyMasterIndiviualUnits[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("PropertyMasterID", PropertyMasterID);
    queryParams = queryParams.append("listingpurposeID", listingpurposeID);
    queryParams = queryParams.append("UnitCategoryID", UnitCategoryID);
    queryParams = queryParams.append("status", status);
    queryParams = queryParams.append("PageNumber", pageNumber);
    queryParams = queryParams.append("RowsNumbers", rowsNumbers);
    return await firstValueFrom(this.http
      .get<OwnerPropertyMasterIndiviualUnits[]>(
        `@mumtalikati-api/OwnerPropertyDetail/GetPropertyMasterIndiviualsUnit`, { params: queryParams }
      )).then(res => res as OwnerPropertyMasterIndiviualUnits[]).catch(err => { return Promise.reject(err) });
  }
  async getPropertyMasterIndiviualsUnitTotalCount(PropertyMasterID: number, listingpurposeID: number, UnitCategoryID: number, status: number): Promise<Number> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("PropertyMasterID", PropertyMasterID);
    queryParams = queryParams.append("listingpurposeID", listingpurposeID);
    queryParams = queryParams.append("UnitCategoryID", UnitCategoryID);
    queryParams = queryParams.append("status", status);
    return await firstValueFrom(this.http
      .get<Number>(
        `@mumtalikati-api/OwnerPropertyDetail/GetPropertyMasterIndiviualsUnitTotalCount`, { params: queryParams }
      )).then(res => res as Number).catch(err => { return Promise.reject(err) });
  }
  async getPropertyUnitDetails( landLordID: number, UnitCategoryID: number, PropertyMasterID: number,  propertyUnitid: number): Promise<OwnerRentDetail[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("LandLordID", landLordID);
    queryParams = queryParams.append("UnitCategoryID", UnitCategoryID);
    queryParams = queryParams.append("PropertyMasterID", PropertyMasterID);
    queryParams = queryParams.append("PropertyUnitID", propertyUnitid);
    return await firstValueFrom(this.http
      .get<OwnerRentDetail[]>(
        `@mumtalikati-api/PropertyDetail/GetPropertyUnitDetails`, { params: queryParams }
      )).then(res => res as OwnerRentDetail[]).catch(err => { return Promise.reject(err) });
  }
  async getPropertyFeature( id: number): Promise<PropertyFeature[]> {
    return await firstValueFrom(this.http
      .get<PropertyFeature[]>(
        `@mumtalikati-api/PropertyFeature/`+id
      )).then(res => res as PropertyFeature[]).catch(err => { return Promise.reject(err) });
  }
  async postSendEmail(sendEmail: SendEmail) :Promise<SendEmail> {
    return await firstValueFrom(  this.http.post('@mumtalikati-api/ContactUsEmailAPI/SendEmail',sendEmail ))
      .then(res => res as SendEmail )
      .catch(err => { return Promise.reject(err.json().error || 'error'); });
}
 async postPropertyFilter(propertyFilte: PropertyFilter ):Promise<OwnerPropertyFilter[]>{
  return await firstValueFrom(this.http
    .post<OwnerPropertyFilter[]>(`@mumtalikati-api/PropertyFilter/GetPropertyFilter`,propertyFilte))
    .then(res => res as OwnerPropertyFilter[])
    .catch(err =>{return Promise.reject(err.json().error || 'error');});
 }
  
//  async mapPopertyFilter(){
//   const rentalUnitDetail = new RentalUnitDetail();
//  }
}
