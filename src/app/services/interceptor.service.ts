import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { SessionService } from "../services/sessionService";
import { environment } from "src/environments/environment";
@Injectable()
export class InterceptorService implements HttpInterceptor {
    constructor(private sessionService: SessionService) { }
    intercept( req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let requestUrl = req.url;
    // const token = this.sessionService.getToken();
        if (requestUrl.indexOf('@mumtalikati-api') !== -1) {
            requestUrl = requestUrl.replace('@mumtalikati-api', environment.userBaseUrl);
        }
        if(!requestUrl.includes(environment.assetsBaseUrl)){
            req = req.clone({
            //   headers: req.headers.set('Authorization', `Bearer ${token}`),
              url: requestUrl
            });
            } else{
            req = req.clone({
              url: requestUrl
            });
            }
        return next.handle(req);
    }
}