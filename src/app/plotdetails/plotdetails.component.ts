import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { assetUrl } from 'src/single-spa/asset-url';
import { OwnerRentDetail } from '../models/ownerRentDetailmodel';
import { PropertyFeature } from '../models/propertyfeature';
import { MumtalikatiService } from '../services/mumtalikati.service';
import { getPropertyUnitCategoryEnum, getstatusType, listingPurposeTypeEnum, propertyMasterTypeEnum } from '../models/enums';
import { ProfileImage } from '../models/profileImage.model';
import { map } from 'rxjs';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Clipboard } from '@angular/cdk/clipboard';
@Component({
  selector: 'app-plotdetails',
  templateUrl: './plotdetails.component.html',
  styleUrls: ['./plotdetails.component.scss']
})
export class PlotdetailsComponent implements OnInit {
  pmid!: number;
  propertyUnitid!: number;
  unitcatID!: number;
  landlordid!: number;
  loading: boolean = false;
  propertyDetail: OwnerRentDetail[] = [];
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
  parentStyle = { 'background-color': 'black' };
  color = { 'color': 'black!important' };
  logocolor = false;
  propertyFeature: PropertyFeature[] = []
  myModel = true;
  statuss!: number;
  imageUser!: ProfileImage;
  public page: number = 1;
  public perpagenumber: number = 8;
  listpurID!: any;
  PropertySubTypeID!: any;
  pMTID!: number;
  btnColor={'background-color':'#9e2a2b'}
  closeResult = '';
  maxheight={'maxheight':'80vh !important'}
  caption!:string;
  activeroutes = { 'color': '#9e2a2b !important', 'font-weight':'500' };
  constructor(private route: ActivatedRoute, private mumtalikatiservic: MumtalikatiService, private router: Router,private modalService: NgbModal,private clipboard: Clipboard) {
    this.listpurID = this.router.getCurrentNavigation()!.extras.state!["listingPurposeID"]!;
    this.PropertySubTypeID = this.router.getCurrentNavigation()!.extras.state!["PropertySubTypeID"]!;
    this.caption = this.router.getCurrentNavigation()!.extras.state!["caption"]!;
  }
  async ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.pmid = +params['propertyMasterID'];
      this.propertyUnitid = +params['propertyUnitID'];
      this.unitcatID = +params['unitCategoryID'];
      this.landlordid = +params['landlordid'];
      this.statuss = +params['status'];
      // this.listpurID = +params['listingPurposeID']
      this.getPropertyDetails(this.landlordid, this.unitcatID, this.pmid, this.propertyUnitid);
      this.getPropertyFeatures(this.pmid);
      this.getImageUser(this.landlordid);
    });

  }
  async getPropertyDetails(landLordID: number, UnitCategoryID: number, PropertyMasterID: number, propertyUnitid: number) {
    this.loading = true;
    this.mumtalikatiservic.getPropertyUnitDetails(landLordID, UnitCategoryID, PropertyMasterID, propertyUnitid)
      .then((data) => {
        if (data) {
          this.propertyDetail = data;
        }
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
        console.error(error);
      });
  }
  async getImageUser(landLordID: number) {
    this.loading = true;
    this.mumtalikatiservic.getUserImage(landLordID)
      .then((data) => {
        if (data) {
          this.imageUser = data;
        }
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
        console.error(error);
      });
  }
  async getPropertyFeatures(id: number) {
    this.loading = true;
    this.mumtalikatiservic.getPropertyFeature(id)
      .then((data) => {
        if (data) {
          this.propertyFeature = data;
        }
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
        console.error(error);
      });
  }
  getenum(propertyMasterTypeID: number) {
    let pmtid = propertyMasterTypeID;
    this.pMTID=pmtid 
    return propertyMasterTypeEnum(propertyMasterTypeID)
  }
  getstatus(statuss: number) {
    return getstatusType(statuss)
  }
  getpropertyunitCategoryid(unitcatID: number) {
    return getPropertyUnitCategoryEnum(unitcatID)
  }
  addItem(newItem: number) {
    this.listpurID.push(newItem);
    
  }
  backotsearch() {
    this.router.navigate(
      ['Unitscategory'],
      { queryParams: { 'propertyMasterID': this.pmid, 'listingPurposeID': this.listpurID, 'unitCategoryID': this.unitcatID, 'status': this.statuss, 'page': this.page, 'perpagenumber': this.perpagenumber,'propertyMasterTypeID':this.pMTID,'landLordID':this.landlordid } });
  }
  oncallclick(call:any){
   
      this.modalService.open(call,{ centered: true } ).result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
      );
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
    closepop(){
      this.modalService.dismissAll();
    }
    copyHeroName(el: HTMLDivElement) {
      this.clipboard.copy(el.innerText);
    }
    getlist(listid:any){
      return listingPurposeTypeEnum(listid)
    }
    redirectToWhatsApp(contact: number) {
      let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      let phoneNumber = contact;
      let message = `https://www.mumtalikati.com/propertyfulldisplay?propertyMasterID=${this.pmid}&unitCategoryID=${this.unitcatID}&propertyUnitID=${this.propertyUnitid}&landlordid=${this.landlordid} `;
  
      if (isMobile) {
        window.location.href = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
      } else {
      window.open(`https://wa.me/?phone=${phoneNumber}&text=${encodeURIComponent(message)}`);
      }
    }
}
