import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { ToastService } from './toast.service';
import { AuthService } from './auth.service';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

    constructor(private authService:AuthService,private ngZone:NgZone,private toastService:ToastService) { }

   handleError(error: any): void {
       this.ngZone.run(()=>{
        console.log(error);
        if(error && error.status ==401){
            this.toastService.sendError("You have been loged out from the system, Please login back");
            this.authService.Logout();
        }
        else     
            this.toastService.sendError(error)
       })
   }
   handle
}
