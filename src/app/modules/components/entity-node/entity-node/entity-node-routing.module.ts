import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EntityNodeListComponent } from '../entity-node-list/entity-node-list.component';
import { EntityNodeComponent } from './entity-node.component';

@NgModule({
    imports: [RouterModule.forChild([        
        { 
            path: '', component: EntityNodeListComponent, 
        },
        {
            path:'details',pathMatch:"full",component: EntityNodeComponent
        },
        {
            path:'details/:id',pathMatch:"full",component: EntityNodeComponent
        }
    ])],
    exports: [RouterModule]
})
export class EntityNodeRoutingModule { }
