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
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const commonHeaders={
            'Content-Type':'application/json'
        }
        const requestCopy=this.getRequestCopy(request,commonHeaders)
        return next.handle(requestCopy).pipe(
            tap((event: HttpEvent<any>) => {
            console.log('Incoming HTTP response', event);
            }),
            catchError((error:any)=>{
                return throwError(error);
            })
        );
    }
    private getRequestCopy(request:HttpRequest<any>,headers:any):HttpRequest<any>{
        const newHeaders=new HttpHeaders(headers);
        const requestCopy:HttpRequest<any>=request.clone({
            headers:newHeaders
        })
        return requestCopy;

    }
}