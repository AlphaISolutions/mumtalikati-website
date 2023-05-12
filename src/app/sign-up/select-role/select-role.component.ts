import { Component, OnInit } from '@angular/core';
import { BspropertyService } from 'src/app/services/behaviour.subject/propertyDetail.bs.service';
import { assetUrl } from 'src/single-spa/asset-url';


@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.component.html',
  styleUrls: ['./select-role.component.scss']
})
export class SelectRoleComponent implements OnInit {
  selectedRole!: number;
  emailimag=assetUrl('icons/house-owner.png')
  phoneimg=assetUrl('icons/phoneicon.png')
  constructor(private bsSignupService: BspropertyService) { }

  ngOnInit(): void {
  }
  selectUserRole(id: number) {
    this.selectedRole = id;
   
      this.bsSignupService.onboardingStep$.next(2)
    
  

    // this.bsSignupService.userRole$.next(id);
    // if(this.selectedRole === 1){
    //   this.bsSignupService.userTypeId$.next(UserTypeEnum.Applicant);
    // }
  }

  // next() {
  //   if (this.selectedRole === 1) {
  //     this.bsSignupService.onboardingStep$.next(3)
  //   }
  //   else {
  //     this.bsSignupService.onboardingStep$.next(2);
  //   }
  // }

  onchangetab(index: number) {
    this.bsSignupService.selectedTab$.next(0);
    this.bsSignupService.onboardingStep$.next(1);
  }
}
