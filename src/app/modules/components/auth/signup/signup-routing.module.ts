import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from './signup.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: SignUpComponent },
        { path: 'signup/:id/:name/:user', component: SignUpComponent },
        { path: 'signupuser/:id/:name/:user', component: SignUpComponent }
    ])],
    exports: [RouterModule]
})
export class SignUpRoutingModule { }
