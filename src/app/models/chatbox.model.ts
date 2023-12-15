export class Request {
    user: number | null;
    prompt: string;
  
    
  }
  
  export class Chatbox {
    request: Request;
    constructor(request: Request) {
        this.request = request;
      }
  }