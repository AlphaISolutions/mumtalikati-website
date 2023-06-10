import { HttpClient } from "@angular/common/http";
import { UserLogin } from "../models/login.model";
import { firstValueFrom } from 'rxjs';
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: 'root'
})
  export class UserService {
    constructor(private http: HttpClient) { }
    async postUserLogin(UserLogin:UserLogin):Promise<UserLogin>{
        return await firstValueFrom(this.http
          .post<UserLogin>(`@mumtalikati-api/Users/Authenticate`,UserLogin))
          .then(res => res as UserLogin)
          .catch(err =>{return Promise.reject(err.json().error || 'error');});
       }
  }