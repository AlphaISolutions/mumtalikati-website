import { Component, OnInit, Output , AfterViewInit, ElementRef, Renderer2} from '@angular/core';
import {
  OwnerPropertyFilter,
  PropertyFilter,
} from '../models/PropertyFilter.model';
import { MumtalikatiService } from '../services/mumtalikati.service';
import { assetUrl } from 'src/single-spa/asset-url';
import { MatDialog } from '@angular/material/dialog';
import {ChartboxComponent} from "./../chartbox/chartbox.component";
import { ChatboxService } from '../services/chatbox.service';
import { Chatbox, Request } from '../models/chatbox.model';
import { FormControl } from '@angular/forms';
// import  anime from 'animejs';
import anime from 'animejs/lib/anime.es';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loading = false;
  messageControl = new FormControl('');
  chatmessages: { text: string; isUser: boolean }[] = [];
  bot = assetUrl('icons/Bot.svg');
  SendButton=assetUrl('icons/SendButton.svg');
  boticon =  assetUrl('icons/Bot.png');
  showChatbox = false;
  chatloading: boolean = false;
  propertyfilter = new PropertyFilter();
  ownerPropertyFilter: OwnerPropertyFilter[] = [];
  listid: number | null = 1;
  pageNumber: number = 1;
  rowsNumber: number = 20;
  color: any;
  toggle: any;
  isActive: boolean = false;
  page: boolean = false;
  rightrow: boolean = false;
  leftrow: boolean = false;
  isLoading: boolean = true;
  elementStyles: any = {
    color: this.isActive ? 'green' : 'red',
  };
  constructor(private mumtalikatiservic: MumtalikatiService,public dialog: MatDialog,private chatbox: ChatboxService,private el: ElementRef, private renderer: Renderer2) { }
  async ngOnInit() {
    let data = this.propertyfilter;
    data.listingPurposesID = this.listid;
    data.pageNumber = this.pageNumber;
    data.rowsNumbers = this.rowsNumber;
    this.propertyFilter(data);
    if (this.toggle) {
      this.color = {
        'background-color': 'white!important',
        color: 'black!important',
      };
    } else {
      this.color = { 'background-color': 'transparent!important' };
    }
    this.button();
  }
  ngAfterViewInit(): void {
    // const textWrapper = document.querySelector('.an-1');
    // textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  
    // const tl = anime.timeline({ loop: true });
  
    // tl.add({
    //   targets: '.an-1 .letter',
    //   scale: [4, 1],
    //   opacity: [0, 1],
    //   translateZ: 0,
    //   // easing: "easeOutExpo",
    //   // duration: 950,
    //   delay: (el, i) => 100 * i
    // })
  }
  
  button() {
    if (localStorage.getItem('locale') == 'ar') {
      this.rightrow = true;
    } else {
      this.leftrow = true;
    }
  }
  getcolor(listid: number) {
    if ((listid = 1)) {
      this.color = { 'background-color': 'red!important' };
    } else {
      this.color = { 'background-color': 'green!important' };
    }
  }
  getColorClass() {
    return this.isActive ? 'active' : 'inactive';
  }
  propertyFilter(data: any) {
    this.isLoading = true;
    this.mumtalikatiservic
      .postPropertyFilter(data)
      .then((data) => {
        if (data) {
          this.ownerPropertyFilter = data;
        }
        this.isLoading = false;
      })
      .catch((error) => {
        this.isLoading = false;
        console.error(error);
      });
  }

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
  // anime() {
  //   const textWrapper = this.el.nativeElement.querySelector('.chatbot-message');

  //   if (textWrapper) {
  //     textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

  //     anime.timeline({ loop: true })
  //       .add({
  //         targets: '.an-1 .letter',
  //         scale: [4, 1],
  //         opacity: [0, 1],
  //         translateZ: 0,
  //         easing: 'easeOutExpo',
  //         duration: 950,
  //         delay: (el, i) => 70 * i,
  //       })
  //       .add({
  //         targets: '.an-1',
  //         opacity: 0,
  //         duration: 1000,
  //         easing: 'easeOutExpo',
  //         delay: 1000,
  //       });
  //   } else {
  //     console.error('Element with class "chatbot-message" not found');
  //   }
  // }
}
