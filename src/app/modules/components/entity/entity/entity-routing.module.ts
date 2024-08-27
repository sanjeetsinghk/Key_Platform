import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EntityComponent } from './entity.component';

@NgModule({
    imports: [RouterModule.forChild([        
        { 
            path: '', component: EntityComponent, 
        },
        // {
        //     path:'details',pathMatch:"full",component: EntityNodeTypeDetailsComponent
        // }
    ])],
    exports: [RouterModule]
})
export class EntityRoutingModule { }
