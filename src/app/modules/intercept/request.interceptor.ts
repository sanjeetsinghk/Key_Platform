import { Injectable } from "@angular/core";
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpHeaders,
  } from '@angular/common/http';
  import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoadingService } from "../service/loading.service";
import { ToastService } from "../service/toast.service";
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor(private _loading: LoadingService,private _sendResponse:ToastService){}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this._loading.setLoading(true, request.url);
        const commonHeaders={
            'Content-Type':'application/json'
        }
        const requestCopy=this.getRequestCopy(request,commonHeaders)
        return next.handle(requestCopy).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this._loading.setLoading(false, request.url);                    
                    if(event.body.success)
                    {
                        if(event.body.message)
                            this._sendResponse.sendResponse(event.body.message)
                    }
                    else
                        this._sendResponse.sendError(event.body.message)
                  }
                console.log('Incoming HTTP response', event);

            }),
            catchError((error:any)=>{
                this._loading.setLoading(false, request.url);
                console.log(error)
                return throwError(error);
            })
        );
    }
    private getRequestCopy(request:HttpRequest<any>,headers:any):HttpRequest<any>{
       
        if(request.url.indexOf('login')==-1 &&request.url.indexOf('signup')==-1  )
        {
            let accessToken=JSON.parse(localStorage.getItem('user'));
            if(accessToken && accessToken?.token){
                headers={...headers,'Authorization':'Bearer '+accessToken?.token}
            }
        }
        const newHeaders=new HttpHeaders(headers);
        const requestCopy:HttpRequest<any>=request.clone({
            headers:newHeaders
        })
        return requestCopy;

    }
}