import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EntityNodeComponent } from './entity-node-component.component';
@NgModule({
    imports: [RouterModule.forChild([        
        { 
            path: '', component: EntityNodeComponent, 
        }
    ])],
    exports: [RouterModule]
})
export class EntityNodeComponentRoutingModule { }
