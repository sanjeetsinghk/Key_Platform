import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../modules/service/auth.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];
    userName!:string;
    companyName!:string;
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,private authService:AuthService) { }
    ngOnInit(){
        this.items = [
            {
                label: 'Settings',
                icon: 'pi  pi-cog',
                items: [
                    {
                        label: 'Logout',
                        icon: 'pi pi-fw pi-sign-outs',
                       
                    }
                ]
            }
        ];
        this.userName=this.authService.getUserEmail();
        this.companyName=this.authService.getSelectedCompanyName();
    }
    logout(){
        this.authService.Logout();
    }
}
