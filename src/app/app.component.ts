import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { filter, forkJoin, map } from 'rxjs';
import { Governorate } from './models/governorate.model';
import { ListingPurpose } from './models/listing-purpose.model';
import { PropertyMasterType } from './models/property-master-type.model';
import { PropertyMasterSubType } from './models/propertyMasterSubType .model';
import { PropertyUnitCategory } from './models/propertyUnitCategory.model';
import { SetupService } from './services/setup.service';
import { Router,NavigationEnd, ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // standalone:true,
  // imports:[CommonModule,RouterOutlet]
})
export class AppComponent {
  title = 'mumtalikati-website';
  loading: boolean = false;
  listingpupose: ListingPurpose[] = [];
  propertymasterType: PropertyMasterType[] = []
  propertysubType: PropertyMasterSubType[] = []
  propertyUnitCategoryType: PropertyUnitCategory[] = [];
  governorate: Governorate[] = [];
  constructor(private setservice: SetupService, private router: Router, private metaService: Meta,private titleService: Title,private activatedRoute: ActivatedRoute) { }
  showfooter: boolean = false;
  currentRoute!:string
  async ngOnInit() {
    this.getlistingPurpose();
    this.getPropertyMasterType();
    this.getPropertySubType();
    this.getPropertyUnitCategoryType();
    this.getgovernorates();
    this.getFilterdata()

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)
    ).subscribe(()=>{
    var rt=this.getChild(this.activatedRoute)
    rt.data.subscribe(data=>{
      if(data.title == undefined){
      }else{
        this.titleService.setTitle(data.title)
          if (data.descrption) {
            this.metaService.updateTag({ name: 'description', content: data.descrption })
          } else { 
            this.metaService.removeTag("name='description'")
          }
      }
      
    })
    })
  }

  async getlistingPurpose() {
    this.setservice.getlistingpurposeset()
      .then((data) => {
        if (data) {
          this.listingpupose = data
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async getPropertyMasterType() {
    this.setservice.getPropertyMasterTypes()
      .then((data) => {
        if (data) {
          this.propertymasterType = data
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async getPropertySubType() {
    this.setservice.getPropertySubTypes()
      .then((data) => {
        if (data) {
          this.propertysubType = data
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async getPropertyUnitCategoryType() {
    this.setservice.getPropertyUnitCategoryTypes()
      .then((data) => {
        if (data) {
          this.propertyUnitCategoryType = data
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async getgovernorates() {
    this.setservice.getGovernorate()
      .then((data) => {
        if (data) {
          this.governorate = data
        }
      })
      .catch((error) => {
        this.loading = false;
        console.error(error);
      });
  }
  getFilterdata() {
    this.loading = true;
    forkJoin({
      propertyListPurpose: this.setservice.getlistingpurposeset(),
      propertyMasterType: this.setservice.getPropertyMasterTypes(),
      propertyPropertySubType: this.setservice.getPropertySubTypes(),
      propertyUnitCategoryTypes: this.setservice.getPropertyUnitCategoryTypes(),
      propertyGovernorates: this.setservice.getGovernorate(),
    
    }).pipe(
      map(response => {
        return response;
      })
    ).subscribe((data) => {
      this.listingpupose = <Array<any>>data.propertyListPurpose;
      this.propertymasterType = <Array<any>>data.propertyMasterType;
      this.propertysubType = <Array<any>>data.propertyPropertySubType;
      this.propertyUnitCategoryType = <Array<any>>data.propertyUnitCategoryTypes;
      this.governorate = <Array<any>>data.propertyGovernorates;
      this.loading = false;
    }, error => {
      this.loading = false;
      console.error(error);
    });
  }
  getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
 
  }
}
