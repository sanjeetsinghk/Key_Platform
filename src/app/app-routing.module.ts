import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './modules/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './modules/service/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '',canActivate: [AuthGuard], loadChildren: () => import('./modules/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'roles',canActivate: [AuthGuard], loadChildren: () => import('./modules/components/admin/roles/roles.module').then(m => m.RolesModule) },
                    { path: 'company',canActivate: [AuthGuard], loadChildren: () => import('./modules/components/company/company.module').then(m => m.CompanyModule) },
                    { path: 'users', loadChildren: () => import('./modules/components/users/users.module').then(m => m.UsersModule) },
                    { path: 'entity',canActivate: [AuthGuard], loadChildren: () => import('./modules/components/entity/entity/entity.module').then(m =>m.EntityModule) },
                    { path: 'entitytype',canActivate: [AuthGuard], loadChildren: () => import('./modules/components/entity-type/entity-type.module').then(m => m.EntityTypeModule) },
                    { path: 'entitynode',canActivate: [AuthGuard], loadChildren: () => import('./modules/components/entity-node/entity-node/entity-node.module').then(m => m.EntityNodeModule) },
                    { path: 'entitynodetype',canActivate: [AuthGuard], loadChildren: () => import('./modules/components/entity-node-type/entity-node-type.module').then(m => m.EntityNodeTypeModule) },
                    { path: 'entitynodecomponent',canActivate: [AuthGuard], loadChildren: () => import('./modules/components/entity-node-component/entity-node-component.module').then(m => m.EntityNodeComponentModule) },
                    { path: 'scenario',canActivate: [AuthGuard], loadChildren: () => import('./modules/components/scenario/scenario/scenario.module').then(m =>m.ScenarioModule) },
                ]
            },
            { path: 'auth', loadChildren: () => import('./modules/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./modules/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], 
        { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' }
        
    )
        
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
