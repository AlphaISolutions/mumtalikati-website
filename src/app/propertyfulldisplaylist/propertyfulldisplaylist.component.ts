import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { assetUrl } from 'src/single-spa/asset-url';
import { ListingPurposeTypeEnum, PropertySubTypeEnum, PropertyUnitCategoryEnum, getPropertyUnitCategoryEnum, getstatusType, listingPurposeTypeEnum } from '../models/enums';
import { OwnerRentDetail } from '../models/ownerRentDetailmodel';
import { PropertyFeature } from '../models/propertyfeature';
import { Clipboard } from '@angular/cdk/clipboard';
import { ProfileImage } from '../models/profileImage.model';
import Splide from '@splidejs/splide';
import { State } from '../models/state.model';
import { FilterService } from '../services/filterserice';
import { Subscription } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';
import * as L from 'leaflet';
@Component({
  selector: 'app-propertyfulldisplaylist',
  templateUrl: './propertyfulldisplaylist.component.html',
  styleUrls: ['./propertyfulldisplaylist.component.scss']
})
export class PropertyfulldisplaylistComponent implements OnInit {
  @Input() propertyDetail: OwnerRentDetail;
  @Input() propertyFeature: PropertyFeature[] = []
  location = assetUrl("icons/location.svg");
  areaimg = assetUrl("icons/Area.svg");
  phoneicon = assetUrl("icons/phoneicon.png");
  copyIcon = assetUrl("icons/copyicon.png");
  bedroomimg = assetUrl("icons/Bedroom.svg");
  washroomimg = assetUrl("icons/Washroom.svg");
  kitchen = assetUrl("icons/kitchen.png");
  hall = assetUrl("icons/hall.png");
  favoriteicon = assetUrl("icons/favoriteicon.png");
  bydefault = assetUrl('img/bydefault.png');
  defaultperfile = assetUrl('img/landlord-bydefault.png');
  loading: boolean = true
  @Input() unitcatID!: number;
  @Input() statuss!: number;
  @Input() PropertySubTypeID: any;
  @Input() propertyUnitid!: number;
  @Input() pmid!: number
  @Input() landlordid!: number;
  @Input() imageUser!: ProfileImage;
  @Input() unitcategorydesc!: string;
  @Input() propertysubdesc!: string;
  @Input() propertyMasterSubType!: number;
  @Input() unitsid!: number
  @Input() sharedmodel = new State;
  classsting: string;
  ReadLess:string=localStorage.getItem('locale') || 'ar'
  ReadMore:string=localStorage.getItem('locale');
  PropertySubTypeEnum=PropertySubTypeEnum;
  PropertyUnitCategoryEnum=PropertyUnitCategoryEnum;
  ListingPurposeTypeEnum=ListingPurposeTypeEnum;
  closeResult = '';
  private langChangeSubscription: Subscription;
  direction: string = this.service.getActiveLang() === 'ar' ? 'rtl' : 'rtl';
  constructor(private modalService: NgbModal, private clipboard: Clipboard, private filterService: FilterService, private service: TranslocoService) {
    this.langChangeSubscription = this.service.langChanges$.subscribe(() => {
      this.direction = this.service.getActiveLang() === 'ar' ? 'rtl' : 'rtl';
    });
  }
  mainSlider: Splide;
  thumbnailSlider: Splide;

  ngOnInit() {
    this.featureclass();
    this.readless(this.ReadLess);
    this.readmore(this.ReadLess)
  }
  ngAfterViewInit() {
    if (this.propertyDetail && this.propertyDetail.imageString.length > 0) {
      this.mainSlider = new Splide('#main-slider', {
        type: 'loop',
        heightRatio: 0.5,
        pagination: true,
        arrows: false,
        cover: true,
        autoplay: false,
        width: '100%',

      });
      this.mainSlider.mount();
      if(this.propertyDetail && this.propertyDetail.imageString.length > 1){
        this.thumbnailSlider = new Splide('#thumbnail-slider', {
          rewind: true,
          fixedWidth: 100,
          fixedHeight: 58,
          isNavigation: true,
          gap: 10,
          focus: 'center',
          pagination: false,
          cover: true,
          dragMinThreshold: {
            mouse: 4,
            touch: 10,
          },
          breakpoints: {
            640: {
              fixedWidth: 100,
              fixedHeight: 55,
            },
          },
        });
        this.thumbnailSlider.mount();
        this.mainSlider.sync(this.thumbnailSlider);
      }
      
    }
    if(this.propertyDetail && this.propertyDetail.lat && this.propertyDetail.long){
      let mymap = L.map('map').setView([Number(this.propertyDetail.lat), Number(this.propertyDetail.long)], 13)
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
        [Number(this.propertyDetail.lat), Number(this.propertyDetail.long)], { icon: markerIcon }
      ).addTo(mymap);
    }
   
  }

  getlist(listid: any) {
    return this.filterService.getPurposeid(listid)
    // return listingPurposeTypeEnum(listid)
  }
  getpropertyunitCategoryid(unitcatID: number) {
    return this.filterService.getPropertytUnitCategoryid(unitcatID)
    // return getPropertyUnitCategoryEnum(unitcatID)
  }
  getstatus(statuss: number) {
    return this.filterService.getStatusbyID(statuss);
  }
  toggleReadMore(property: any) {
    property.isExpanded = !property.isExpanded;
  }
  oncallclick(call: any, phone: number) {
    let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    let phoneNumber = phone;
    if (isMobile) {
      window.open(`tel:${phone}`);
    } else {
      this.modalService.open(call, { centered: true }).result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
      );
    }
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  closepop() {
    this.modalService.dismissAll();
  }
  copyHeroName(el: HTMLDivElement) {
    this.clipboard.copy(el.innerText);
  }
  redirectToWhatsApp(contact: number) {
    let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    let phoneNumber = contact;
    let message = `https://www.mumtalikati.com/propertyfulldisplay?unitCategory=${this.unitcategorydesc}&PropertySubTyp=${this.propertysubdesc}&propertyMaster=${this.pmid}&propertyUnit=${this.propertyUnitid}&landlord=${this.landlordid}`;
    if (isMobile) {
      window.location.href = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    }
    else {
      window.open(`https://wa.me/?phone=${phoneNumber}&text=${encodeURIComponent(message)}`);
    }
  }
  featureclass() {
    if (localStorage.getItem('locale') == 'ar') {
      this.classsting = 'justify-content:right'
    } else {
      this.classsting = 'justify-content:left'
    }
  }

  readless(language: string) {
    var lang = {
      "en-US": "Read Less",
      "ar": "أقرأ أقل",
    }
    return lang[language] || "Unknown";
  }
  readmore(language: string) {
    var lang = {
      "en-US": "Read Move",
      "ar": "اقرأ أكثر",
    }
    return lang[language] || "Unknown";
  }
}
