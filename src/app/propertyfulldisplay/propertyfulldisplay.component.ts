import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { assetUrl } from 'src/single-spa/asset-url';
import { OwnerRentDetail } from '../models/ownerRentDetailmodel';
import { MumtalikatiService } from '../services/mumtalikati.service';

@Component({
  selector: 'app-propertyfulldisplay',
  templateUrl: './propertyfulldisplay.component.html',
  styleUrls: ['./propertyfulldisplay.component.scss']
})
export class PropertyfulldisplayComponent implements OnInit {
  pmid!: number;
  propertyUnitid!: number;
  unitcatID!: number;
  landlordid!: number;
  loading: boolean = false;
  propertyDetail: OwnerRentDetail[] = [];
  location = assetUrl("icons/location.svg");
  areaimg = assetUrl("icons/Area.svg");
  bedroomimg = assetUrl("icons/Bedroom.svg");
  washroomimg = assetUrl("icons/Washroom.svg");
  kitchen = assetUrl("icons/kitchen.png");
  hall = assetUrl("icons/hall.png");
  bydefault = assetUrl('img/bydefault.png');
  constructor(private route: ActivatedRoute, private mumtalikatiservic: MumtalikatiService,) { }
  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.pmid = +params['propertyMasterID'];
      this.propertyUnitid = +params['propertyUnitID'];
      this.unitcatID = +params['unitCategoryID'];
      this.landlordid = +params['landlordid'];
      this.getPropertyDetails(this.landlordid, this.unitcatID, this.pmid, this.propertyUnitid)

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
}
