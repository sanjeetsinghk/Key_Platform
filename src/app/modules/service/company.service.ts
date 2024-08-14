import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICompany } from '../models/company.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';
import { UserDto } from '../models/userDto.model';

@Injectable({
    providedIn:'root'
})
export class CompanyService {
    constructor(private http: HttpClient,private localStorageService:LocalStorageService) { }
    saveCompany(company:ICompany):Observable<any>{
        return this.http.post(environment.apiurl+'company/saveOrg',company).pipe(
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
    updateCompany(company:ICompany[]):Observable<any>{
        return this.http.post(environment.apiurl+'company/updateorg',company).pipe(
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
    getCompanies():Observable<any>{

        return this.http.get(environment.apiurl+'company/getCompanyList').pipe(
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
    getCountries() {
        return this.http.get<any>('assets/modules/data/countries.json')
            .toPromise()
            .then(res => res.data as any[])
            .then(data => data);
    }
    inviteUserToCompany(data:UserDto):Observable<any>{
        return this.http.post(environment.apiurl+'company/inviteUserToCompany',data).pipe(
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
}
