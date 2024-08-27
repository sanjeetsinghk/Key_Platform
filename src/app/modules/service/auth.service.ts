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
export class AuthService {
  private _loginUrl = environment.apiurl;
  private _refreshUrl = '/auth/refresh';
  private _localSetSession = 'localdata/setsession';
  private _localLogout = 'localdata/logou';

  constructor(private router:Router,private http: HttpClient, private authState: AuthState) {}

  // login method
  Login(username: string, password: string): Observable<any> {
    return this.http.post(this._loginUrl+'authManagement/login', { email:username, password:password }).pipe(
      map((response) => {
        // prepare the response to be handled, then return
        const retUser: IAuthInfo = NewAuthInfo((<any>response).resultData);

        // save session and return user if needed
        return this.authState.SaveSession(retUser);
      }),
      // if we are setting cookie on server, this is the place to call local server
      //switchMap((user) => this.SetLocalSession(user)),
      catchError((error)=>{
        return throwError(error || 'server error.')
      })
    );
  }
  
  RegisterUserToCompany(data:ICompanyAdmin):Observable<any>{
    return this.http.post(this._loginUrl+'authManagement/register-user-to-company', data).pipe(
        map((response) => {
          // prepare the response to be handled, then return
         return response;
        }),
        // if we are setting cookie on server, this is the place to call local server
        //switchMap((user) => this.SetLocalSession(user)),
        catchError((error)=>{
          return throwError(error || 'server error.')
        })
      );
  }
  RegisterCompanyAdmin(data:ICompanyAdmin):Observable<any>{
    return this.http.post(this._loginUrl+'authManagement/register-company-admin', data).pipe(
        map((response) => {
          // prepare the response to be handled, then return
         return response;
        }),
        // if we are setting cookie on server, this is the place to call local server
        //switchMap((user) => this.SetLocalSession(user)),
        catchError((error)=>{
          return throwError(error || 'server error.')
        })
      );
  }
  RefreshToken(): Observable<IAuthInfo> {
    return this.http
      .post(this._refreshUrl, { token: this.authState.GetRefreshToken() })
      .pipe(
        map((response) => {
          // this response has the new refresh token and access token
          if (!response) {
            // something terrible happened
            throw new Error('Oh oh');
          }

          // update session
          const retUser: IAuthInfo = NewAuthInfo((<any>response).data);
          this.authState.UpdateSession(retUser);

          return retUser;
        }),
        // if we use set session on local server, then this is the place
        // to call it
        //switchMap((response) => this.SetLocalSession(response))
      );
  }

  SetLocalSession(user: IAuthInfo): Observable<IAuthInfo> {
    // prepare the information to use in the cookie
    // basically the auth info and the cookie name
    const data = PrepSetSession(user);
    // notice the relative url, this is the path you need to setup in your server
    // look up an example in server.js
    return this.http.post(this._localSetSession, data).pipe(
      map((response) => {
        return user;
      })
    );
  }
getUserEmail(){
    return this.authState.getUserEmail();
}
getUserId(){
  return this.authState.getUserId();
}
getSelectedCompany(){
  return this.authState.getSelectedCompany();
}
getSelectedCompanyName(){
  return this.authState.getSelectedCompanyName();
}
Logout() {
  // logout locally
  const data = PrepLogout();
  this.authState.Logout(true);
}
}
