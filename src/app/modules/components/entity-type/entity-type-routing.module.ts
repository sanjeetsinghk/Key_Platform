import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EntityTypeComponent } from './entity-type.component';
import { EntityTypeDetailsComponent } from '../entity-type_details/entity-type-details/entity-type-details.component';



@NgModule({
    imports: [RouterModule.forChild([        
        { 
            path: '', component: EntityTypeComponent, 
        },
        {
            path:'details',pathMatch:"full",component: EntityTypeDetailsComponent
        }
    ])],
    exports: [RouterModule]
})
export class EntityTypeRoutingModule { }
