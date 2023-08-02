import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subscription, filter, forkJoin, map } from 'rxjs';
import { Governorate } from './models/governorate.model';
import { ListingPurpose } from './models/listing-purpose.model';
import { PropertyMasterType } from './models/property-master-type.model';
import { PropertyMasterSubType } from './models/propertyMasterSubType .model';
import { PropertyUnitCategory } from './models/propertyUnitCategory.model';
import { SetupService } from './services/setup.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { Status } from './models/status.model';
import { TranslocoService } from '@ngneat/transloco';
import { GeolocationService } from './services/geolocation.service';
import { IpService } from './services/ipaddres.service';
import { HttpClient } from '@angular/common/http';
import { RegionModel } from './models/region.model';


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
  getStatus: Status[] = []
  private langChangeSubscription: Subscription;
  currentCountry: any;
  locationJs: any;
  public ipAddress: string;
  publicIpAddress: string = 'Loading...';
 
  direction: string = this.service.getActiveLang() === 'ar' ? 'ltr' : 'rtl';
  constructor(private setservice: SetupService, private router: Router, private metaService: Meta, private titleService: Title, private activatedRoute: ActivatedRoute, private service: TranslocoService, private geolocationService: GeolocationService,
    private ipService: IpService, private http: HttpClient) {
   
    this.langChangeSubscription = this.service.langChanges$.subscribe(() => {
      this.direction = this.service.getActiveLang() === 'ar' ? 'rtl' : 'ltr';
    });
  }
  showfooter: boolean = false;
  currentRoute!: string
  async ngOnInit() {
    // this.getIpAddress();
    this.getlistingPurpose();
    this.getPropertyMasterType();
    this.getPropertySubType();
    this.getPropertyUnitCategoryType();
    this.getgovernorates();
    this.getFilterdata();
    this.getstatus();

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      var rt = this.getChild(this.activatedRoute)
      rt.data.subscribe(data => {
        if (data.title == undefined) {
        } else {
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
  async getstatus() {
    this.setservice.getStatus()
      .then((data) => {
        if (data) {
          this.getStatus = data
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
  getIpAddress() {
    window.RTCPeerConnection = window.RTCPeerConnection
    const pc = new RTCPeerConnection({ iceServers: [] });
    pc.createDataChannel('');

    pc.onicecandidate = (e) => {
      if (!e.candidate) {
        this.ipAddress = pc.localDescription.sdp.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/)[0];
        console.log(this.ipAddress)
      }
    };

    pc.createOffer().then((sdp) => {
      pc.setLocalDescription(sdp);
    });
  }
 
}








