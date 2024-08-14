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
export class UserService {
  private _apiUrl = environment.apiurl;
 

  constructor(private router:Router,private http: HttpClient) {}

  // User List method
  GetUserList(): Observable<any> {
    return this.http.get(this._apiUrl+'user/getUserList').pipe(
      map((response) => {       
        return response;
      }),    
      catchError((error)=>{
        return throwError(error || 'server error.')
      })
    );
  }
  
}
