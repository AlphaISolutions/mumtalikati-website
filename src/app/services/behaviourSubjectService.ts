import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class behaviourSubjectService {
    public PropertyData$ = new BehaviorSubject<any>(null);
    public PropertyData: Observable<any>;
    constructor() {
        this.PropertyData = this.PropertyData$.asObservable();
    }
}