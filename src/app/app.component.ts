import {
  Component,
  OnInit,
  inject,
  ElementRef,
  Renderer2,
  ViewChild,
  AfterViewInit 
} from '@angular/core';
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
import { error } from '@rxweb/reactive-form-validators';
import * as firebase from 'firebase/app';
import { environment } from 'src/environments/environment';
import { RemoteConfig } from '@angular/fire/remote-config';
import { assetUrl } from 'src/single-spa/asset-url';
import { FormControl } from '@angular/forms';
import { ChatboxService } from '../app/services/chatbox.service';
import { Chatbox, Request } from '../app/models/chatbox.model';
import anime from 'animejs/lib/anime.es';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // standalone:true,
  // imports:[CommonModule,RouterOutlet]
})
export class AppComponent {
  // @ViewChild('animationElement') animationElement: ElementRef;
  messageControl = new FormControl('');
  chatmessages: { text: string; isUser: boolean }[] = [];
  bot = assetUrl('icons/Bot.svg');
  SendButton = assetUrl('icons/SendButton.svg');
  boticon = assetUrl('icons/Bot.png');
  showChatbox = false;
  chatloading: boolean = false;
  getcountrycode: string;
  loading: boolean = false;
  listingpupose: ListingPurpose[] = [];
  propertymasterType: PropertyMasterType[] = [];
  propertysubType: PropertyMasterSubType[] = [];
  propertyUnitCategoryType: PropertyUnitCategory[] = [];
  governorate: Governorate[] = [];
  getStatus: Status[] = [];
  private langChangeSubscription: Subscription;
  currentCountry: any;
  locationJs: any;
  public ipAddress: string;
  private remoteConfig: RemoteConfig = inject(RemoteConfig);
  direction: string = this.service.getActiveLang() === 'ar' ? 'ltr' : 'rtl';
  constructor(
    private ip: GeolocationService,
    private setservice: SetupService,
    private router: Router,
    private metaService: Meta,
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private service: TranslocoService,
    // private geolocationService: GeolocationService,
    // private ipService: IpService,
    private http: HttpClient,
    private chatbox: ChatboxService,
    private el: ElementRef,
    private renderer: Renderer2,

  ) {
    this.langChangeSubscription = this.service.langChanges$.subscribe(() => {
      this.direction = this.service.getActiveLang() === 'ar' ? 'rtl' : 'ltr';
    });
  }
  showfooter: boolean = false;
  currentRoute!: string;
  async ngOnInit() {
    // this.getcurrentCountry()
    // this.getIpAddress();
    this.getlistingPurpose();
    this.getPropertyMasterType();
    this.getPropertySubType();
    this.getPropertyUnitCategoryType();
    this.getgovernorates();
    this.getFilterdata();
    this.getstatus();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        var rt = this.getChild(this.activatedRoute);
        rt.data.subscribe((data) => {
          if (data.title == undefined) {
          } else {
            this.titleService.setTitle(data.title);
            if (data.descrption) {
              this.metaService.updateTag({
                name: 'description',
                content: data.descrption,
              });
            } else {
              this.metaService.removeTag("name='description'");
            }
          }
        });
      });
  }
  ngAfterViewInit(): void {
    // const textWrapper = this.el.nativeElement.querySelector('.an-1');
    // if (textWrapper) {
    //   textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    //   const tl = anime.timeline({ loop: true });

    //   tl.add({
    //     targets: '.an-1 .letter',
    //     scale: [4, 1],
    //     opacity: [0, 1],
    //     translateZ: 0,
    //     easing: "easeOutExpo",
    //     duration: 950,
    //     delay: (el, i) => 70 * i
    //   })
    // }
  }
  //  async getcurrentCountry(){
  //     try {
  //       const response: RegionModel = await this.ip.getCurrentCountry();
  //       if (response) {
  //         const countryCode = response.countryCode.toLowerCase();
  //         if (localStorage.getItem('locale') === null) {
  //           if (countryCode === 'om') {
  //             localStorage.setItem('locale', 'ar');
  //           } else {
  //             localStorage.setItem('locale', 'en-US');
  //           }
  //         // const countryCode = response.countryCode.toLowerCase();
  //         // const locale = (localStorage.getItem('locale') === 'en-US') ? 'en-US' : (countryCode === 'om') ? 'ar' : 'ar';
  //         // localStorage.setItem('locale', locale);
  //       }
  //       else if(countryCode === 'om'){
  //         localStorage.setItem('locale', 'ar');
  //       }else if(localStorage.getItem('locale') ==='en-US'){
  //         localStorage.setItem('locale', 'en-US');
  //       }else{
  //         localStorage.setItem('locale', 'ar');
  //       }
  //     }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  getlistingPurpose() {
    this.setservice
      .getlistingpurposeset()
      .then((data) => {
        if (data) {
          this.listingpupose = data;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  getPropertyMasterType() {
    this.setservice
      .getPropertyMasterTypes()
      .then((data) => {
        if (data) {
          this.propertymasterType = data;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  getPropertySubType() {
    this.setservice
      .getPropertySubTypes()
      .then((data) => {
        if (data) {
          this.propertysubType = data;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  getPropertyUnitCategoryType() {
    this.setservice
      .getPropertyUnitCategoryTypes()
      .then((data) => {
        if (data) {
          this.propertyUnitCategoryType = data;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  getgovernorates() {
    this.setservice
      .getGovernorate()
      .then((data) => {
        if (data) {
          this.governorate = data;
        }
      })
      .catch((error) => {
        this.loading = false;
        console.error(error);
      });
  }
  getstatus() {
    this.setservice
      .getStatus()
      .then((data) => {
        if (data) {
          this.getStatus = data;
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
    })
      .pipe(
        map((response) => {
          return response;
        })
      )
      .subscribe(
        (data) => {
          this.listingpupose = <Array<any>>data.propertyListPurpose;
          this.propertymasterType = <Array<any>>data.propertyMasterType;
          this.propertysubType = <Array<any>>data.propertyPropertySubType;
          this.propertyUnitCategoryType = <Array<any>>(
            data.propertyUnitCategoryTypes
          );
          this.governorate = <Array<any>>data.propertyGovernorates;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          console.error(error);
        }
      );
  }
  getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }
  // getIpAddress() {
  //   window.RTCPeerConnection = window.RTCPeerConnection
  //   const pc = new RTCPeerConnection({ iceServers: [] });
  //   pc.createDataChannel('');

  //   pc.onicecandidate = (e) => {
  //     if (!e.candidate) {
  //       this.ipAddress = pc.localDescription.sdp.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/)[0];

  //     }
  //   };

  //   pc.createOffer().then((sdp) => {
  //     pc.setLocalDescription(sdp);
  //   });
  // }
  toggleChatbox() {
    this.showChatbox = !this.showChatbox;
  }
  sendMessage() {
    const userMessage = this.messageControl.value;
    const chatRequest: Request = {
      user: 123,
      prompt: userMessage,
    };
    const userChatMessage = { text: userMessage, isUser: true };
    this.chatmessages.push(userChatMessage);
    this.chatloading = true;
    const chatbox = new Chatbox(chatRequest);
    this.messageControl.setValue('');
    this.chatbox
      .postChatBox(chatbox)
      .then((data) => {
        const chatbotMessage = { text: (data as any).answer, isUser: false };
        this.chatmessages.push(chatbotMessage);
        this.chatloading = false;
      })
      .catch((error) => {
        // this.loading = false;
        console.error(error);
      })
      .finally(() => {
        this.chatloading = false;
        this.messageControl.setValue('');
      });
    
  }
  clearChat(): void {
    this.chatmessages = [];
    this.toggleChatbox()
  }
  sendMessageqery(userMessage: string) { 
    const chatRequest: Request = {
      user: 123,
      prompt: userMessage,
    };
    const userChatMessage = { text: userMessage, isUser: true };
    this.chatmessages.push(userChatMessage);
    this.chatloading = true;
    const chatbox = new Chatbox(chatRequest);
    this.messageControl.setValue('');
    this.chatbox
      .postChatBox(chatbox)
      .then((data) => {
        const chatbotMessage = { text: (data as any).answer, isUser: false };
        this.chatmessages.push(chatbotMessage);
        this.chatloading = false;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.chatloading = false;
        this.messageControl.setValue('');
      });
  }
  
}
