import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ToastService } from './modules/service/toast.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [MessageService]
})
export class AppComponent implements OnInit {

    constructor(private messageService: MessageService,private primengConfig: PrimeNGConfig,private toastService:ToastService) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.toastService.handleErrorMessage.subscribe((error)=>{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: typeof(error)=='object'?'Server Error':error });
        });
        
    }
}
