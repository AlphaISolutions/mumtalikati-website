import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class SessionService {
    constructor() { }
    startSession(token: string) {
        localStorage.setItem('token', token);
        // localStorage.setItem('userId', userId);
        // localStorage.setItem('userRole',userRole.toString());
    }
    stopSession() {
        localStorage.removeItem('token');
        // localStorage.removeItem('userId');
        // localStorage.removeItem('userRole');
    }
    getToken() {
        return localStorage.getItem('token');
    }
    // getUserId() {
    //     return localStorage.getItem('userId');
    // }
    // getUserRole() {
    //     return localStorage.getItem('userRole');
    // }

}