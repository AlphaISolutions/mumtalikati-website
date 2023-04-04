import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BspropertyService {
    public propertyfilterdata$ = new BehaviorSubject<any>(null);


    public propertyfilterdata: Observable<any>;
    constructor() {
        this.propertyfilterdata = this.propertyfilterdata$.asObservable();
    }
    public get propertyfilterValue() {
        return this.propertyfilterdata$.value;
      }
}