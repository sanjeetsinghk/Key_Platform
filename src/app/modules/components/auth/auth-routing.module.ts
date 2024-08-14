import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginResolve } from '../../service/login.resolve';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
        { path: 'access', loadChildren: () => import('./access/access.module').then(m => m.AccessModule) },
        { path: 'login', resolve: {
            ready: LoginResolve,
          }, loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
        { path: 'signup',data:{viewOption:'companyInvitation'},  loadChildren: () => import('./signup/signup.module').then(m => m.SignUpModule) },
        { path: 'signupuser',data:{viewOption:'userInvitation'},  loadChildren: () => import('./signup/signup.module').then(m => m.SignUpModule) },
         
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
