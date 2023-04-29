import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BspropertyService } from '../../services/behaviour.subject/propertyDetail.bs.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  selectedIndex = 0;
  constructor(  private formBuilder: FormBuilder,public dialog: MatDialog,private dialogRef: MatDialogRef<1>,private bsSignupService: BspropertyService) { }

  ngOnInit(): void {
    this.bsSignupService.selectedTab$.subscribe(res => {
      this.selectedIndex = res;
    });
  }


}
