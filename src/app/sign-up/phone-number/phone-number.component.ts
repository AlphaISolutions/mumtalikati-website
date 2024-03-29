import { Component, OnInit } from '@angular/core';
import { BspropertyService } from 'src/app/services/behaviour.subject/propertyDetail.bs.service';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.scss']
})
export class PhoneNumberComponent implements OnInit {
  getthecodeloading: boolean = true
  constructor(private bsSignupService: BspropertyService) { }

  ngOnInit(): void {
  }
  getOtp() {
 
    if(this.bsSignupService.onchangepasswordStep$){
      this.bsSignupService.onchangepasswordStep$.next(3)
    }else{
      this.bsSignupService.onboardingStep$.next(3)
      this.getthecodeloading=false;
    }

  }
  onchangetab(index: number) {
    this.bsSignupService.selectedTab$.next(0);
    this.bsSignupService.onboardingStep$.next(1);
  }
}
