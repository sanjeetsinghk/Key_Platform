import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Entities',
                items: [
                    { label: 'Company', icon: 'pi pi-fw pi-id-card', routerLink: ['/company'] },
                    { label: 'Users', icon: 'pi pi-user', routerLink: ['/users'] },
                    { label:'Products', icon: 'pi pi-fw pi-id-card',
                        items:[
                           { label: 'Entity', icon: 'pi pi-fw pi-check-square', routerLink: ['/entity']},
                           { label: 'Entity Type', icon: 'pi pi-fw pi-check-square', routerLink: ['/entitytype']},
                           { label: 'Entity Node Type', icon: 'pi pi-fw pi-check-square', routerLink: ['/entitynodetype']}
                        ]
                    },
                    { label: 'Scenarios', icon: 'pi pi-user', routerLink: ['/scenario'] },
                ]
            }           
        ];
    }
}
