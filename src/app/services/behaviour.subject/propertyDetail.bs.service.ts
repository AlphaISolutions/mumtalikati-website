import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class BspropertyService {
    public selectedTab$ = new BehaviorSubject<any>(0);
    public propertyfilterdata$ = new BehaviorSubject<any>(null);
    public onboardingStep$ = new BehaviorSubject<any>(1);

    public onboardingStep : Observable<number>;
    public selectedTab : Observable<number>;
    public propertyfilterdata: Observable<any>;
    constructor() {
        this.propertyfilterdata = this.propertyfilterdata$.asObservable();
        this.onboardingStep = this.onboardingStep$.asObservable();
        this.selectedTab =this.selectedTab$.asObservable();
    }
    public get propertyfilterValue() {
        return this.propertyfilterdata$.value;
      }
}