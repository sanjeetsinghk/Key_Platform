import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICompany } from '../models/company.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';
import { UserDto } from '../models/userDto.model';
import { ISelectedCompanyDto } from '../models/company-selection.model';
import { IEntityNodeTypeModel } from '../models/entity-node-type.model';

@Injectable({
    providedIn:'root'
})
export class EntityNodeTypeService {
    constructor(private http: HttpClient,private localStorageService:LocalStorageService) { }
    selectedEntityModel:IEntityNodeTypeModel;
    saveEntityType(data:IEntityNodeTypeModel):Observable<any>{
        return this.http.post(environment.apiurl+'entitynodetype/saveEntityNodeType',data).pipe(
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
    updateEntityType(data:IEntityNodeTypeModel):Observable<any>{
        return this.http.post(environment.apiurl+'entitynodetype/updateEntityNodeType',data).pipe(
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
    deleteEntityType(data:IEntityNodeTypeModel[]):Observable<any>{
        return this.http.post(environment.apiurl+'entitynodetype/deleteEntityNodeType',data).pipe(
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
        return this.http.post(environment.apiurl+'entitynodetype/getEntityNodeTypeLists',data).pipe(
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
