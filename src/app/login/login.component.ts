import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  selectedIndex = 0;
  loginForm!: FormGroup;
  onbodystep: number = 1;
  hide = true;
  submitted = false;
  constructor(  private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get fval() { return this.loginForm.controls; }
  onFormSubmit(){

  }
  lostpas(){

  }
}
