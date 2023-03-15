import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class SessionService {
    constructor() { }
    startSession(token: string, userId: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
    }
    stopSession() {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');

    }
    getToken() {
        return localStorage.getItem('token');
    }
    getUserId() {
        return localStorage.getItem('userId');
    }

}