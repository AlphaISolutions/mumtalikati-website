import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class SessionService {
    constructor() { }
    startSession(token: string, name: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('name', name);
        // localStorage.setItem('userId', userId);
        // localStorage.setItem('userRole',userRole.toString());
    }
    stopSession() {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
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
    getUsername() {
        return localStorage.getItem('name');
    }
}