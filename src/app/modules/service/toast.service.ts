import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class ToastService {

    private handleErrorMessage$=new BehaviorSubject<any>('');
    handleErrorMessage=this.handleErrorMessage$.asObservable();

    private handleResponseMessage$=new BehaviorSubject<any>('');
    handleResponseMessage=this.handleResponseMessage$.asObservable();

    sendError(error){
        if(error && typeof(error)!==undefined){
        this.handleErrorMessage$.next(error);
        this.handleErrorMessage=this.handleErrorMessage$.asObservable();
        }
    }
    
    sendResponse(response){
        this.handleResponseMessage$.next(response);
        this.handleResponseMessage=this.handleResponseMessage$.asObservable();
    }

}