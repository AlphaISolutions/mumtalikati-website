import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { assetUrl } from 'src/single-spa/asset-url';
import { getPropertyUnitCategoryEnum, getstatusType, listingPurposeTypeEnum } from '../models/enums';
import { OwnerRentDetail } from '../models/ownerRentDetailmodel';
import { PropertyFeature } from '../models/propertyfeature';
import { Clipboard } from '@angular/cdk/clipboard';
import { ProfileImage } from '../models/profileImage.model';
import { file } from '@rxweb/reactive-form-validators';
import Splide from '@splidejs/splide';
import { OwnerPropertyWholeBuilding } from '../models/ownerPropertyWholeBuilding.model';
@Component({
  selector: 'app-propertyfulldisplaylist',
  templateUrl: './propertyfulldisplaylist.component.html',
  styleUrls: ['./propertyfulldisplaylist.component.scss']
})
export class PropertyfulldisplaylistComponent implements OnInit {
  @Input() propertyDetail: OwnerRentDetail[] = [];
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
  defaultperfile: string = 'https://p.kindpng.com/picc/s/24-248729_stockvader-predicted-adig-user-profile-image-png-transparent.png';
  loading:boolean=true
  @Input() unitcatID!: number;
  @Input() statuss!: number;
  @Input() imgindex: number = 0;
  @Input() listpurID!: any;
  @Input() PropertySubTypeID: any;
  @Input() propertyUnitid!: number;
  @Input() pmid!: number
  @Input() landlordid!: number;
  @Input() imageUser!: ProfileImage;
  @Input() unitcategorydesc!: string;
  @Input() propertysubdesc!: string;
  @Input() propertyMasterSubType!:number;
  @Input()  unitsid!:number
  closeResult = '';
  numVisible = 4;
  startIndex = 0;
  greaterbutton: boolean = false;
  lessthenbutton: boolean = false;
  constructor(private modalService: NgbModal, private el: ElementRef, private cdr: ChangeDetectorRef, private clipboard: Clipboard) { }
  mainSlider!: Splide;
  thumbnailSlider!: Splide;
 async ngOnInit() {
  this.loading=true
    setTimeout(() => {
      this.mainSlider = new Splide('.main-slider', {
        type: 'loop',
        heightRatio: 0.5,
        pagination: true,
        arrows: false,
        cover: true,
      });
      this.mainSlider.mount();
      this.thumbnailSlider = new Splide('.thumbnail-slider',   {
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
    }, 1000); 
  }
  ngAfterViewInit() {

  }

  getlist(listid: any) {
    return listingPurposeTypeEnum(listid)
  }
  getpropertyunitCategoryid(unitcatID: number) {
    return getPropertyUnitCategoryEnum(unitcatID)
  }
  getstatus(statuss: number) {
    return getstatusType(statuss)
  }
  imagechange(i: any) {
    this.imgindex = i;
  }
  lessthen(imglist: any, index: any) {
    // this.startIndex = (this.startIndex + 1) % imglist.length;
    var lengthList = imglist.length
    lengthList = lengthList - 1
    if (index == -1) {

      index = 0;
      // this.lessthenbutton = true;
    }
    if (index < lengthList) {

      this.imgindex = index
      // this.lessthenbutton = false

    }

    else if (index = lengthList) {
      this.imgindex = index;
      // this.greaterbutton = true
    }

  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth < 768) {
      this.numVisible = 3;
    } else if (window.innerWidth < 992) {
      this.numVisible = 4;
    } else {
      this.numVisible = 10;
    }
  }
  onClickNext() {
    // this.startIndex = (this.startIndex + 1) % this.images.length;
  }
  oncallclick(call: any, phone: number) {
    let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    let phoneNumber = phone;
    if (isMobile) {
      window.open(`tel:${{ phoneNumber }}', '_system`);
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
    if (isMobile && typeof window.WhatsApp !== "undefined") {
      window.location.href = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    } else if (isMobile && typeof window.WhatsApp === "undefined") {
      window.open(`https://play.google.com/store/search?q=whatsapp&c=apps&hl=en&gl=US`);
    } else {
      window.open(`https://wa.me/?phone=${phoneNumber}&text=${encodeURIComponent(message)}`);
    }
  }
}
