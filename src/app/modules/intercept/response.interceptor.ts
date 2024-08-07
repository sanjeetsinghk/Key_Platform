import { Injectable } from "@angular/core";
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpHeaders,
    HttpErrorResponse,
  } from '@angular/common/http';
  import { catchError, Observable, tap, throwError } from 'rxjs';
@Injectable()
export class ResponsetInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
        return next.handle(request).pipe(
           
            catchError((error:HttpErrorResponse)=>{
                return throwError(error);
            })
        );
    }
   
}