import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { UserLogin } from 'src/app/models/login.model';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/sessionService';
import { BspropertyService } from '../services/behaviour.subject/propertyDetail.bs.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  onbodystep: number = 1;
  hide = true;
  submitted = false;
  loading = false;
  userlogin!: UserLogin
  constructor(private formBuilder: FormBuilder, private userService: UserService, private bsSignupService: BspropertyService, private router: Router, private toastr: ToastrService,private session:SessionService) { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });

  }
  get fval() { return this.loginForm.controls; }
  get isFormInValid() {
    if (this.loginForm.valid) {
      return false
    }
    else {
      return true;
    }
  }
  onFormSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    let data = this.loginForm.value as UserLogin
    data.userName = data.userName.replace('+', '');
    this.userService.postUserLogin(data).then(res => {
      if (res !== null) {
        const user = res as unknown as User;
        const userTypes = user.userTypes.map(userType => userType.id);
        if (userTypes.includes(6)) {
          this.toastr.success("Admin Login sucessfully");
          this.router.navigateByUrl('/admin/Dashoard');
          this.session.startSession(user.token,user.name,)
          this.loading = false;
          return
        } else {
          this.toastr.error('Authentication Failed', 'Invalid Credentials');
          this.loginForm.reset();
          this.loading = false;
          return;
        }
      }
    })
      .catch(error => {
        this.toastr.error('Authentication Failed', 'Invalid Credentials');
        alert('Authentication Failed'),
        this.loginForm.reset();
        this.loading = false;
        console.error(error)
      })

  }
}
