import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Chatbox} from '../models/chatbox.model'
import { firstValueFrom } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ChatboxService {

  constructor(private http: HttpClient) { }
 // ChatboxService
async postChatBox(chatbox: Chatbox): Promise<Chatbox> {
  return await firstValueFrom(this.http.post('@chatBox-Url/chat', chatbox))
 .then(res => res as Chatbox)
    .catch(err => {
      // Check if the error response has JSON data
      if (err instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', err.error.message);
      } else if (err.error instanceof Error) {
        // The server returned an error response with a JSON body.
        console.error('Server error:', err.error.message);
      } else if (err.error && err.error.message) {
        // Check if the error object has a message property
        console.error('Server error:', err.error.message);
      } else {
        // The server returned an error response without a clear message.
        console.error('Server error:', err.statusText);
      }

      console.error('Full error object:', err); // Log the entire error object for inspection
      return Promise.reject('error'); // Adjust the rejection value as needed
    });
}

}
