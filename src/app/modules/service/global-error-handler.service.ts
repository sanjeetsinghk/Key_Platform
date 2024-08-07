import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { ToastService } from './toast.service';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

    constructor(private ngZone:NgZone,private toastService:ToastService) { }

   handleError(error: any): void {
       this.ngZone.run(()=>{
        console.log(error);
        this.toastService.sendError(error)
       })
   }
}
