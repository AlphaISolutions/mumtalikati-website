import { Component, OnInit } from '@angular/core';
import { BspropertyService } from 'src/app/services/behaviour.subject/propertyDetail.bs.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit {

  constructor(private bsSignupService: BspropertyService) { }

  ngOnInit(): void {
  }
  onOtpChange(event:any){

  }
  verifyOtp(){
 
    if(this.bsSignupService.onchangepasswordStep$){
      this.bsSignupService.onchangepasswordStep$.next(4)
    }
    else{
      this.bsSignupService.onboardingStep$.next(4)
    }
    
   
  
}
onchangetab(){
  this.bsSignupService.selectedTab$.next(0);
  this.bsSignupService.onboardingStep$.next(1);
}
}
