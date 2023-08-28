import { Component, OnInit, ViewChild } from '@angular/core';
import { assetUrl } from 'src/single-spa/asset-url';
import { } from 'googlemaps';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { SendEmail } from '../models/sendemail.model';
import { MumtalikatiService } from '../services/mumtalikati.service';
import { ToastrService } from 'ngx-toastr';
import { AssetsService } from '../services/assetsServiceservice';
import { Subscription } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';
import * as L from 'leaflet';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {

  aboutSectionImg = assetUrl("img/contact-building.jpg");
  // @ViewChild('map') mapElement: any;
  // map!: google.maps.Map ;
  @ViewChild('regForm') myRegForm;
  contactusform!: FormGroup;
  facebook = assetUrl("icons/fb.png");
  ins = assetUrl("icons/ins.png");
  linkin = assetUrl("icons/linkin.png");
  contactus = assetUrl("doc/contact-us.md");
  location = assetUrl("icons/location.svg");
  sendEmail = new SendEmail();
  loading: boolean = false;
  markdownselect: string;
  markdown: string;
  direction: string;
  private map: L.Map;
  private centroid: L.LatLngExpression = [31.419607715744778, 74.25920125097036]; //
  private langChangeSubscription: Subscription;
  constructor(
    private rxFormBuilder: RxFormBuilder,
    private mumtalikatiservic: MumtalikatiService,
    private toastr: ToastrService,
    private assetsService: AssetsService,
    private service: TranslocoService,
    private formBuilder: FormBuilder
  ) {
    this.langChangeSubscription = this.service.langChanges$.subscribe(() => {
      this.direction = this.service.getActiveLang() === 'ar' ? 'ltr' : 'ltr';
    });
  }

  ngOnInit() {
    navigator.geolocation.watchPosition((position) => {
      let lat = position.coords;

      let mymap = L.map('map').setView([lat.latitude, lat.longitude], 13)
      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 10,
        attribution: 'Mumtalikati'
      });
      tiles.addTo(mymap);
      const markerIcon = L.icon({
        iconUrl: this.location,
        iconSize: [32, 32],
      });
      var marker = L.marker(
        [lat.latitude, lat.longitude], { icon: markerIcon }
      ).addTo(mymap);
      marker.on('click', function () {
        // Use the stored 'self' reference to access this.propertyDetail
        const googleMapsUrl = `https://www.google.com/maps?q=${Number(lat.latitude)},${Number(lat.longitude)}`;
        window.open(googleMapsUrl, '_blank');
      });
      // var popup = L.popup()
      //   .setLatLng([lat.latitude, lat.longitude])
      //   .setContent("Hi")
      //   .openOn(mymap);
   
    })
    this.contactusform = this.rxFormBuilder.formGroup(this.sendEmail);
    this.contactusform = this.formBuilder.group({
      name: ['', Validators.required],
      phonenumber: ['', Validators.required],
      email: ['', Validators.required],
      subject: ['', Validators.required],
      body: ['', Validators.required],
    });
    // this.contactusform = this.rxFormBuilder.formGroup(this.sendEmail);
    // const mapProperties = {
    //   center: new google.maps.LatLng(35.2271, -80.8431),
    //   zoom: 15,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    // this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);

  }
  get contactusformValid() {
    if (this.contactusform.valid) {
      return false;
    }
    else {
      return true;
    }
  }
  async onSubmit() {
    if (this.contactusform.valid) {
      this.loading = true;
      this.mumtalikatiservic.postSendEmail(this.contactusform.value as SendEmail)
        .then((data) => {
          if (data) {
            this.toastr.success('Thank you for contacting us!');
            // this.contactusform.reset();
            this.myRegForm.resetForm();
          }
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          this.toastr.error('Oops, something went wrong.Please try again later');
          // this.contactusform.reset();
          this.myRegForm.resetForm();
        });
    }


  }
  // async getContactset() {
  //   this.assetsService.getcontactmum()
  //     .then((data) => {
  //       if (data !== null) {
  //         this.markdownselect = data;

  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }
  // async getContactus() {
  //   this.assetsService.getcontact()
  //     .then((data) => {
  //       if (data !== null) {
  //         this.markdown = data;

  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }
  //  initMap():void {
  //   this.map = L.map('map', {
  //     center: this.centroid,
  //     zoom: 13
  //   });
  // }
}
