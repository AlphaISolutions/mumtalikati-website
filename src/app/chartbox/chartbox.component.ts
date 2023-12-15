import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatboxService } from '../services/chatbox.service';
import { Chatbox, Request } from '../models/chatbox.model';
import { FormControl } from '@angular/forms';
import { assetUrl } from 'src/single-spa/asset-url';
declare var anime: any;
@Component({
  selector: 'app-chartbox',
  templateUrl: './chartbox.component.html',
  styleUrls: ['./chartbox.component.scss'],
})
export class ChartboxComponent implements OnInit {
  loading = false;
  @Output() closeChatbox: EventEmitter<void> = new EventEmitter<void>();
  messageControl = new FormControl('');
  chatmessages: { text: string; isUser: boolean }[] = [];
  bot = assetUrl('icons/Bot.svg');
  SendButton=assetUrl('icons/SendButton.svg');
  constructor(private chatbox: ChatboxService) {}

  ngOnInit(): void {
 
  }
  ngAfterViewInit(): void {
    const textWrapper = document.querySelector('.chatbot-message.an-1');
    if (textWrapper) {
      textWrapper.innerHTML = textWrapper.textContent.replace(
        /\S/g,
        "<span class='letter'>$&</span>"
      );
      anime
        .timeline({ loop: true })
        .add({
          targets: '.chatbot-message.an-1 .letter',
          scale: [4, 1],
          opacity: [0, 1],
          translateZ: 0,
          easing: 'easeOutExpo',
          duration: 950,
          delay: (el, i) => 70 * i,
        })
        .add({
          targets: '.chatbot-message.an-1',
          opacity: 0,
          duration: 1000,
          easing: 'easeOutExpo',
          delay: 1000,
        });
    }
  }
  sendMessage() {
    const userMessage = this.messageControl.value;
    const chatRequest: Request = {
      user: 123,
      prompt: userMessage,
    };
    const userChatMessage = { text: userMessage, isUser: true };
    this.chatmessages.push(userChatMessage);
    this.loading = true;
    const chatbox = new Chatbox(chatRequest);
    this.chatbox
      .postChatBox(chatbox)
      .then((data) => {
        const chatbotMessage = { text: (data as any).answer, isUser: false };
        this.chatmessages.push(chatbotMessage);
      })
      .catch((error) => {
        // this.loading = false;
        console.error(error);
      })
      .finally(() => {
        this.loading = false;
        this.messageControl.setValue('');
      });
    // this.messageControl.setValue('');
  }
  toggleChatbox() {
    this.closeChatbox.emit();
  }
}
