import { Component, OnInit } from '@angular/core';
import { BspropertyService } from 'src/app/services/behaviour.subject/propertyDetail.bs.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  onboardingStep: number = 1;
  constructor(private bsSignupService: BspropertyService) { }

  ngOnInit(): void {
    this.bsSignupService.onboardingStep$.subscribe(res => {
      this.onboardingStep = res;
    });
  }

}
