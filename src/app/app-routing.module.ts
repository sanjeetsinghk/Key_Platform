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
                    { path: 'company',canActivate: [AuthGuard], loadChildren: () => import('./modules/components/company/company.module').then(m => m.CompanyModule) },
                    { path: 'users', loadChildren: () => import('./modules/components/users/users.module').then(m => m.UsersModule) },
                    { path: 'entity',canActivate: [AuthGuard], loadChildren: () => import('./modules/components/entity/entity/entity.module').then(m =>m.EntityModule) },
                    { path: 'entitytype',canActivate: [AuthGuard], loadChildren: () => import('./modules/components/entity-type/entity-type.module').then(m => m.EntityTypeModule) },
                    { path: 'entitynodetype',canActivate: [AuthGuard], loadChildren: () => import('./modules/components/entity-node-type/entity-node-type.module').then(m => m.EntityNodeTypeModule) },
                    { path: 'uikit', loadChildren: () => import('./modules/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./modules/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./modules/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./modules/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./modules/components/pages/pages.module').then(m => m.PagesModule) }
                ]
            },
            { path: 'auth', loadChildren: () => import('./modules/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./modules/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
