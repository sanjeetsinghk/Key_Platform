import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAuthInfo } from '../models/auth.model';


// to make a cookie readable in SSR, inject the token from nguniversal module
// import { REQUEST } from '@nguniversal/express-engine/tokens';
// and make Request available in NodeJs
// import { Request } from 'express';

@Injectable({ providedIn: 'root' })
export class AuthState {
  // create an internal subject and an observable to keep track
  private stateItem: BehaviorSubject<IAuthInfo | null> = new BehaviorSubject(
    null
  );
  stateItem$: Observable<IAuthInfo | null> = this.stateItem.asObservable();

  // redirect update
  get redirectUrl(): string {
    return localStorage.getItem('redirectUrl');
  }
  set redirectUrl(value: string) {
    localStorage.setItem('redirectUrl', value);
  }

  constructor(
    private router: Router
  ) // to inject the REQUEST token, we do this:
  // @Optional() @Inject(REQUEST) private request: Request
  {
    // simpler to initiate state here
    // check item validity
    const _localuser: IAuthInfo = this._GetUser();

    if (this.CheckAuth(_localuser)) {
      this.SetState(_localuser);
    } else {
      this.Logout(false);
    }
  }
  // shall move soon to state service
  SetState(item: IAuthInfo) {
    this.stateItem.next(item);
    return this.stateItem$;
  }
  UpdateState(item: Partial<IAuthInfo>) {
    const newItem = { ...this.stateItem.getValue(), ...item };
    this.stateItem.next(newItem);
    return this.stateItem$;
  }
  RemoveState() {
    this.stateItem.next(null);
  }

  // localstorage related methods
  private _SaveUser(user: IAuthInfo) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  private _RemoveUser() {
    localStorage.removeItem('user');
  }

  private _GetUser(): IAuthInfo | null {
    // to make it work in SSR, uncomment
    /*
    if (this.request) {
      const _serverCookie = this.request.cookies['CrCookie'];
      if (_serverCookie) {
        try {
          return JSON.parse(_serverCookie);
        } catch (e) {
          // silence
        }
      }
    }
    */
    const _localuser: IAuthInfo = JSON.parse(localStorage.getItem('user'));
    if (_localuser && _localuser.token) {
      return <IAuthInfo>_localuser;
    }
    return null;
  }

  // adding cookie saving methods
  private _SetCookie(user: IAuthInfo) {
    // save cookie with user, be selective in real life as to what to save in cookie
    let cookieStr =
      encodeURIComponent('CrCookie') +
      '=' +
      encodeURIComponent(JSON.stringify(user));

    // use expiration tp expire the cookie
    const dtExpires = new Date(user.expiration);

    cookieStr += ';expires=' + dtExpires.toUTCString();
    cookieStr += ';path=/';
    // some good security measures:
    cookieStr += ';samesite=lax';
    // when in production
    // cookieStr += ';secure';

    // be strong:
    document.cookie = cookieStr;
  }
  private _DeleteCookie(): void {
    // void token but more importantly expire
    this._SetCookie({ token: '', expiration: null });
  }

  // new saveSessions method
  SaveSession(user: IAuthInfo): IAuthInfo | null {
    if (user.token) {
      this._SaveUser(user);
      this.SetState(user);
      return user;
    } else {
      // remove token from user
      this._RemoveUser();
      this.RemoveState();
      return null;
    }
  }

  UpdateSession(user: IAuthInfo) {
    const _localuser: IAuthInfo = this._GetUser();
    if (_localuser) {
      // only set token and refreshtoken
      _localuser.token = user.token;
      _localuser.refreshToken = user.refreshToken;

      this._SaveUser(_localuser);
      this.UpdateState(user);
    } else {
      // remove token from user
      this._RemoveUser();
      this.RemoveState();
    }
  }

  CheckAuth(user: IAuthInfo) {
    // if no user, or no token, something terrible must have happened
    if (!user || !user.token) {
      return false;
    }
    // if now is larger that expiresAt, it expired
    // if (Date.now() >  new Date(user.expiration)) {
    //   return false;
    // }

    return true;
  }

  // reroute optionally
  Logout(reroute: boolean = false) {
    // remove leftover
    this.RemoveState();
    // and clean localstroage
    this._RemoveUser();

    if (reroute) {
      this.router.navigateByUrl('/auth/login');
    }
  }

  GetToken() {
    const _auth = this.stateItem.getValue();
    // check if auth is still valid first before you return
    return this.CheckAuth(_auth) ? _auth.token : null;
  }
  GetRefreshToken() {
    const _auth = this.stateItem.getValue();
    // check if auth is still valid first before you return
    return this.CheckAuth(_auth) ? _auth.refreshToken : null;
  }
}
