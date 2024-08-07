import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/modules/service/auth.service';
import { AuthState } from 'src/app/modules/service/auth.state';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {
    form: FormGroup;
    valCheck: string[] = ['remember'];
    submitted = false;
    password!: string;

    constructor(
        private formBuilder: FormBuilder,
        public layoutService: LayoutService, 
        private authService: AuthService,
        private authState: AuthState,
        private router: Router) { }
    ngOnInit(){
        this.form = this.formBuilder.group(
        {
            
            email: ['', [Validators.required, Validators.email]],
            password: [
            '',
            [
                Validators.required
            ]
            ]
        });
    }
    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
        }
    login() {
        this.submitted = true;

        if (this.form.invalid) {
          return;
        }
        this.authService
        .Login(this.form.value.email, this.form.value.password)
        .pipe(
        // it's better to pipe catchError
        catchError((error) => {
            console.log(error);
            return throwError(() => error);
        })
        )
        .subscribe({
        next: (result) => {
            // redirect to dashbaord
            this.router.navigateByUrl(
            this.authState.redirectUrl || '/private/dashboard'
            );
        },
        });
    }
}
