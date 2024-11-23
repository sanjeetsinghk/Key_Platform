import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ICompanyAdmin } from 'src/app/modules/models/company-admin.model';
import { AuthService } from 'src/app/modules/service/auth.service';
import { AuthState } from 'src/app/modules/service/auth.state';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class SignUpComponent {
    form: FormGroup;
    valCheck: string[] = ['remember'];
    submitted = false;
    password!: string;
    companyId!:string;
    requestType:string='companyInvitation';
    constructor(
        private formBuilder: FormBuilder,
        public layoutService: LayoutService, 
        private authService: AuthService,
        private authState: AuthState,
        private activeRouter: ActivatedRoute,
        private router: Router) { }
    ngOnInit(){
        this.companyId="";
        let name="";
        let user="";
        this.activeRouter.data.subscribe(data => {
            console.log(data)
            this.requestType=data.viewOption;
        });
        this.activeRouter.queryParams.subscribe(result =>
            {
                console.log(result)
                this.companyId=result["id"];
                name=result['name'];
                user=result['user'];
            });
      
        this.form = this.formBuilder.group(
        {
            name: [name, [Validators.required]],
            email: [user, [Validators.required, Validators.email]],
            password: [ '', [ Validators.required ]  ],
            confirmPassword: [ '', [ Validators.required ]  ]
        },{validator: this.passwordConfirming});
        
    }
    passwordConfirming(frm: FormGroup) {
        return frm.get('password').value === frm.get('confirmPassword').value
           ? null : {'mismatch': true};
     }
    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
        }
    login(){
        this.router.navigate(['/auth/login'])
    }
    signup() {
        this.submitted = true;

        if (this.form.invalid) {
          return;
        }
        let data=this.form.value;
        let _companyDetails:ICompanyAdmin={
            email:data.email,
            password:data.password,
            companyId:this.companyId,
            companyName:data.name
        }
        if(this.requestType=='companyInvitation'){
            this.authService
            .RegisterCompanyAdmin(_companyDetails)
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
            },
            });
        }
        else
        {
            this.authService
            .RegisterUserToCompany(_companyDetails)
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
            },
            });
        }
    }
}
