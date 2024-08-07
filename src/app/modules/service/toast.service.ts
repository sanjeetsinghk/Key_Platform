import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class ToastService {

    private handleErrorMessage$=new BehaviorSubject<any>('');
    handleErrorMessage=this.handleErrorMessage$.asObservable();
    sendError(error){
        this.handleErrorMessage$.next(error);
        this.handleErrorMessage=this.handleErrorMessage$.asObservable();
    }
}