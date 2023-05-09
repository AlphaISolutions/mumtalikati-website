import { Component, OnInit } from '@angular/core';
import { BspropertyService } from 'src/app/services/behaviour.subject/propertyDetail.bs.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  onchangepasswordStep:number = 1;
  constructor(private bsSignupService: BspropertyService) { }

  ngOnInit(): void {
    this.bsSignupService.onchangepasswordStep$.subscribe(res => {
      this.onchangepasswordStep = res;
    });
  }

}
