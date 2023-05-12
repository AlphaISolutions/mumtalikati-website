import { Component, OnInit } from '@angular/core';
import { BspropertyService } from 'src/app/services/behaviour.subject/propertyDetail.bs.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {
  hide = true;
  constructor(private bsSignupService: BspropertyService) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.bsSignupService.onboardingStep$.next(5)
    
  }
  onchangetab(){
    this.bsSignupService.selectedTab$.next(0);
    this.bsSignupService.onboardingStep$.next(1);
  }
}
