import { Component, OnInit } from '@angular/core';
import { assetUrl } from 'src/single-spa/asset-url';

@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.component.html',
  styleUrls: ['./select-role.component.scss']
})
export class SelectRoleComponent implements OnInit {
  selectedRole!: number;
  emailimag=assetUrl('icons/emailicon.png')
  phoneimg=assetUrl('icons/phoneicon.png')
  constructor() { }

  ngOnInit(): void {
  }
  selectUserRole(id: number) {
    this.selectedRole = id;
    // this.bsSignupService.userRole$.next(id);
    // if(this.selectedRole === 1){
    //   this.bsSignupService.userTypeId$.next(UserTypeEnum.Applicant);
    // }
  }

  next() {
    // if (this.selectedRole === 1) {
    //   this.bsSignupService.onboardingStep$.next(3)
    // }
    // else {
    //   this.bsSignupService.onboardingStep$.next(2);
    // }
  }

  onchangetab(index: number) {
    // this.bsSignupService.selectedTab$.next(0);
    // this.bsSignupService.onboardingStep$.next(1);
  }
}
