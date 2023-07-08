import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root"
})
export class LanguageService {
  lang: string = "ar";
  getlang(): string {
    return this.lang;
  }

  setlang(value: string){
    this.lang = value;
  }

}