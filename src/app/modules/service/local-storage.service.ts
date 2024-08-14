import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap, Observable, catchError, throwError } from 'rxjs';
import {
  IAuthInfo,
  NewAuthInfo,
  PrepLogout,
  PrepSetSession,
} from '../models/auth.model';
import { AuthState } from './auth.state';
import { environment } from 'src/environments/environment';
import { ICompanyAdmin } from '../models/company-admin.model';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    constructor(private router:Router,private http: HttpClient, private authState: AuthState) {}

    getRoles(){
        let user=JSON.parse(localStorage.getItem('user'));
        if(user && user?.payload && user?.payload?.roles){
            return user?.payload.roles.map((x)=>x.roleId);
        }


    }
}