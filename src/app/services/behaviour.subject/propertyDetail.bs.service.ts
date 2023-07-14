import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BspropertyService {
    public selectedTab$ = new BehaviorSubject<any>(0);
    public propertyfilterdata$ = new BehaviorSubject<any>(null);
    public onboardingStep$ = new BehaviorSubject<any>(1);
    public onchangepasswordStep$ = new BehaviorSubject<any>(1);
    public lostpassword$ = new BehaviorSubject<boolean>(false);

    public onboardingStep: Observable<number>;
    public selectedTab: Observable<number>;
    public propertyfilterdata: Observable<any>;
    public lostpassword: Observable<boolean>;
    public onchangepasswordStep: Observable<number>;
    constructor() {
        this.propertyfilterdata = this.propertyfilterdata$.asObservable();
        this.onboardingStep = this.onboardingStep$.asObservable();
        this.selectedTab = this.selectedTab$.asObservable();
        this.lostpassword = this.lostpassword$.asObservable();
        this.onchangepasswordStep = this.onchangepasswordStep$.asObservable()
    }
    public get propertyfilterValue() {
        return this.propertyfilterdata$.value;
    }
}