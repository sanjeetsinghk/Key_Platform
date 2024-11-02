import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { RoleType } from '../modules/constants/roleEnum';

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
                label: 'Admin',
                role:[RoleType.PlatformAdmin],
                items: [
                    { label: 'Manage Roles', role:[RoleType.PlatformAdmin], icon: 'pi pi-fw pi-user', routerLink: ['/roles'] }
                ]
            },
            {
                label: 'Entities',
                items: [
                    { label: 'Company',role:[RoleType.PlatformAdmin], icon: 'pi pi-fw pi-id-card', routerLink: ['/company'] },
                    { label: 'Users',role:[RoleType.PlatformAdmin,RoleType.CompanyAdmin], icon: 'pi pi-user', routerLink: ['/users'] },
                    { label:'Products',role:[RoleType.PlatformAdmin,RoleType.CompanyAdmin,RoleType.EntityDeveloper,RoleType.EntityUser], icon: 'pi pi-fw pi-id-card',
                        items:[
                           { label: 'Entity',role:[RoleType.PlatformAdmin,RoleType.CompanyAdmin,RoleType.EntityDeveloper,RoleType.EntityUser], icon: 'pi pi-fw pi-check-square', routerLink: ['/entity']},
                           { label: 'Entity Type',role:[RoleType.PlatformAdmin,RoleType.CompanyAdmin,RoleType.EntityDeveloper,RoleType.EntityUser], icon: 'pi pi-fw pi-check-square', routerLink: ['/entitytype']},
                           { label: 'Entity Node',role:[RoleType.PlatformAdmin,RoleType.CompanyAdmin,RoleType.EntityDeveloper,RoleType.EntityUser], icon: 'pi pi-fw pi-check-square', routerLink: ['/entitynode']},
                           { label: 'Entity Node Type',role:[RoleType.PlatformAdmin,RoleType.CompanyAdmin,RoleType.EntityDeveloper,RoleType.EntityUser], icon: 'pi pi-fw pi-check-square', routerLink: ['/entitynodetype']}
                        ]
                    },
                    { label: 'Scenarios',role:[RoleType.PlatformAdmin,RoleType.CompanyAdmin,RoleType.EntityDeveloper,RoleType.EntityUser], icon: 'pi pi-user', routerLink: ['/scenario'] },
                ]
            }           
        ];
    }
}
