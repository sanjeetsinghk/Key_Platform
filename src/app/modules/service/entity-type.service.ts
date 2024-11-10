import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICompany } from '../models/company.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';
import { UserDto } from '../models/userDto.model';
import { ISelectedCompanyDto } from '../models/company-selection.model';
import { IEntityTypeModel } from '../models/entity-type.model';

@Injectable({
    providedIn:'root'
})
export class EntityTypeService {
    constructor(private http: HttpClient,private localStorageService:LocalStorageService) { }
    selectedEntityModel:IEntityTypeModel;
    saveEntityType(data:IEntityTypeModel):Observable<any>{
        return this.http.post(environment.apiurl+'entitytype/saveentity',data).pipe(
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
    updateEntityType(data:IEntityTypeModel):Observable<any>{
        return this.http.post(environment.apiurl+'entitytype/updateentity',data).pipe(
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
    deleteEntityType(data:IEntityTypeModel[]):Observable<any>{
        return this.http.post(environment.apiurl+'entitytype/deleteentity',data).pipe(
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
    getEntityList(data:ISelectedCompanyDto):Observable<any>{
      return this.http.post(environment.apiurl+'entitytype/getEntityLists',data).pipe(
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
  getEntityTypeById(data:ISelectedCompanyDto):Observable<any>{
      return this.http.post(environment.apiurl+'entitytype/getEntityTypeById',data).pipe(
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
