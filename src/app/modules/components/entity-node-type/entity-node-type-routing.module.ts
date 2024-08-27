import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EntityNodeTypeComponent } from './entity-node-type.component';
import { EntityNodeTypeDetailsComponent } from '../entity-node-type_details/entity-node-type-details/entity-node-type-details.component';
@NgModule({
    imports: [RouterModule.forChild([        
        { 
            path: '', component: EntityNodeTypeComponent, 
        },
        {
            path:'details',pathMatch:"full",component: EntityNodeTypeDetailsComponent
        }
    ])],
    exports: [RouterModule]
})
export class EntityNodeTypeRoutingModule { }
