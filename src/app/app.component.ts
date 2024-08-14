import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ToastService } from './modules/service/toast.service';
import { LoadingService } from './modules/service/loading.service';
import { delay } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [MessageService]
})
export class AppComponent implements OnInit {
    loading:boolean=false;
    constructor( private _loading: LoadingService,private messageService: MessageService,private primengConfig: PrimeNGConfig,private toastService:ToastService) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.toastService.handleErrorMessage.subscribe((error)=>{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: typeof(error)=='object'?'Server Error':error });
        });
        this.toastService.handleResponseMessage.subscribe((response)=>{
            this.messageService.add({ severity: 'success', summary: 'Success', detail: response });
        });
        this.listenToLoading();
    }
    listenToLoading(): void {
        this._loading.loadingSub
          .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
          .subscribe((loading) => {
            console.log(loading)
            this.loading = loading;
          });
      }
}
