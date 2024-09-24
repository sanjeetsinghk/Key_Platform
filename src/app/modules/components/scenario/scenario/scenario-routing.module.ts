import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScenarioListComponent } from '../scenario-list/scenario-list.component';
import { ScenarioComponent } from './scenario.component';


@NgModule({
    imports: [RouterModule.forChild([        
        { 
            path: '', component: ScenarioListComponent, 
        },
        {
            path:'details',pathMatch:"full",component: ScenarioComponent
        },
        {
            path:'details/:id',pathMatch:"full",component: ScenarioComponent
        }
    ])],
    exports: [RouterModule]
})
export class ScenarioRoutingModule { }
