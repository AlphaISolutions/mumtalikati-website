import { Component, OnInit, ViewChild } from '@angular/core';
import { assetUrl } from 'src/single-spa/asset-url';
import { } from 'googlemaps';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { SendEmail } from '../models/sendemail.model';
import { MumtalikatiService } from '../services/mumtalikati.service';
import { ToastrService } from 'ngx-toastr';
import { AssetsService } from '../services/assetsServiceservice';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {
  markdown!: string;
  markdownselect!: string;

  aboutSectionImg = assetUrl("img/contact-building.jpg");
  // @ViewChild('map') mapElement: any;
  // map!: google.maps.Map ;
  contactusform!: FormGroup;
  facebook = assetUrl("icons/fb.png");
  ins = assetUrl("icons/ins.png");
  linkin = assetUrl("icons/linkin.png");
  contactus = assetUrl("doc/contact-us.md");
  sendEmail = new SendEmail();
  loading: boolean = false;
  constructor(private rxFormBuilder: RxFormBuilder, private mumtalikatiservic: MumtalikatiService, private toastr: ToastrService, private assetsService: AssetsService) {
  }

  async ngOnInit() {
    this.contactusform = this.rxFormBuilder.formGroup(this.sendEmail);
    // const mapProperties = {
    //   center: new google.maps.LatLng(35.2271, -80.8431),
    //   zoom: 15,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    // this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    this.getContactus();
    this.getContactset();
  }
  get contactusformValid() {
    if (this.contactusform.valid) {
      return false;
    }
    else {
      return true;
    }
  }
  onSubmit() {
    if (this.contactusform.valid) {
      this.loading = true;
      this.mumtalikatiservic.postSendEmail(this.contactusform.value as SendEmail)
        .then((data) => {
          if (data) {
            this.toastr.success('Thank you for contacting us!');
            this.contactusform.reset();
          }
          this.loading = false;

        })
        .catch((error) => {
          this.loading = false;
          this.toastr.error('Oops, something went wrong.Please try again later');
          this.contactusform.reset();
        });
    }


  }
  async getContactus() {
    this.assetsService.getcontact()
      .then((data) => {
        if (data !== null) {
          this.markdown = data;

        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async getContactset() {
    this.assetsService.getcontactmum()
      .then((data) => {
        if (data !== null) {
          this.markdownselect = data;

        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
