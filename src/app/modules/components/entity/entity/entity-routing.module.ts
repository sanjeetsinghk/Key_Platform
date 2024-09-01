import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EntityComponent } from './entity.component';
import { EntityListComponent } from '../entity-list/entity-list.component';

@NgModule({
    imports: [RouterModule.forChild([        
        { 
            path: '', component: EntityListComponent, 
        },
        {
            path:'details/:id',pathMatch:"full",component: EntityComponent
        }
    ])],
    exports: [RouterModule]
})
export class EntityRoutingModule { }
