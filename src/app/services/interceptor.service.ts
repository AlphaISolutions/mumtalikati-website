import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
} from "@angular/common/http";
import { Observable, switchMap, take } from "rxjs";
import { Injectable } from "@angular/core";
import { SessionService } from "../services/sessionService";
import { environment } from "src/environments/environment";
import { LanguageService } from "./language.service";
@Injectable()
export class InterceptorService implements HttpInterceptor {
    constructor(private sessionService: SessionService, private languageService: LanguageService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let requestUrl = req.url;
        const token = this.sessionService.getToken();
        if (requestUrl.indexOf('@mumtalikati-api') !== -1) {
            requestUrl = requestUrl.replace('@mumtalikati-api', environment.userBaseUrl);
        }
        else if (requestUrl.indexOf('@assets-url') !== -1) {
            requestUrl = requestUrl.replace('@assets-url', environment.assetsBaseUrl);
        }
        if (!requestUrl.includes(environment.assetsBaseUrl)) {
            let locale = localStorage.getItem('locale') ?? 'ar'
            req = req.clone({
                headers: req.headers.set('Accept-Language', locale).set('Authorization', `Bearer ${token}`),
                url: requestUrl
            });
        }
        else {
            req = req.clone({
                url: requestUrl
            });
        }
        return next.handle(req);
    }
}