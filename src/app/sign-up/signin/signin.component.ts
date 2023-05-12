import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { error } from '@rxweb/reactive-form-validators';
import { BspropertyService } from '../../services/behaviour.subject/propertyDetail.bs.service';
import { UserService } from 'src/app/services/user.service';
import { UserLogin } from 'src/app/models/login.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm!: FormGroup;
  onbodystep: number = 1;
  hide = true;
  submitted = false;
  loading: boolean = false;
  userlogin!: UserLogin
  
  constructor(private formBuilder: FormBuilder, private userService: UserService, private bsSignupService: BspropertyService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });

  }
  get fval() { return this.loginForm.controls; }
  onFormSubmit() {

    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.postUserLogin(this.loginForm.value).then((data: any) => {
      if (data) {
        this.userlogin = data
      }

    }).catch((error: any) => {
      console.error(error)
    })

  }
  lostpas() {
   this.bsSignupService.lostpassword$.next(true)
  }
  registernow() {
    this.bsSignupService.selectedTab$.next(1)
  }
}
