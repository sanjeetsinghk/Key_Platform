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


@Injectable({ providedIn: 'root' })
export class AuthService {
  private _loginUrl = environment.apiurl;
  private _refreshUrl = '/auth/refresh';
  private _localSetSession = 'localdata/setsession';
  private _localLogout = 'localdata/logou';

  constructor(private http: HttpClient, private authState: AuthState) {}

  // login method
  Login(username: string, password: string): Observable<any> {
    return this.http.post(this._loginUrl+'usermanagement/login', { email:username, password:password }).pipe(
      map((response) => {
        // prepare the response to be handled, then return
        const retUser: IAuthInfo = NewAuthInfo((<any>response).data);

        // save session and return user if needed
        return this.authState.SaveSession(retUser);
      }),
      // if we are setting cookie on server, this is the place to call local server
      switchMap((user) => this.SetLocalSession(user)),
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
        switchMap((response) => this.SetLocalSession(response))
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

  Logout(): Observable<boolean> {
    // logout locally
    const data = PrepLogout();

    return this.http.post(this._localLogout, data).pipe(
      map((response) => {
        return true;
      })
    );
  }
}
