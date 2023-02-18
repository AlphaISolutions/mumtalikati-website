import { Component, OnInit, ViewChild } from '@angular/core';
import { assetUrl } from 'src/single-spa/asset-url';
import { } from 'googlemaps';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {
  @ViewChild('map') mapElement: any;
  map!: google.maps.Map ;

  facebook = assetUrl("icons/fb.png");
  ins = assetUrl("icons/ins.png");
  linkin = assetUrl("icons/linkin.png");
  constructor() { 
   
  }

  ngOnInit(): void {
    const mapProperties = {
      center: new google.maps.LatLng(35.2271, -80.8431),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
  }

}
