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
import { EntityInfoModel } from '../models/entity-info.model';
import { EntityNodeInfoModel } from '../models/entity-node.model';
import { CloneDetails } from '../models/cloneDetails.model';
import { IEntityListModel } from '../models/entity-list.model';

@Injectable({
    providedIn:'root'
})
export class EntityNodeTypeService {
    constructor(private http: HttpClient,private localStorageService:LocalStorageService) { }
    selectedEntityModel:IEntityNodeTypeModel;
    entityTypesModel:IEntityNodeTypeModel[];
    saveEntityType(data:IEntityNodeTypeModel):Observable<any>{
        return this.http.post(environment.apiurl+'entitynode/saveEntityNodeType',data).pipe(
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
        return this.http.post(environment.apiurl+'entitynode/updateEntityNodeType',data).pipe(
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
        return this.http.post(environment.apiurl+'entitynode/deleteEntityNodeType',data).pipe(
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
    deleteEntityNode(data:IEntityListModel[]):Observable<any>{
      return this.http.post(environment.apiurl+'entitynode/deleteEntityNode',data).pipe(
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
        return this.http.post(environment.apiurl+'entitynode/getEntityNodeTypeLists',data).pipe(
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
    saveEntityNode(data:EntityNodeInfoModel):Observable<any>{
      return this.http.post(environment.apiurl+'entitynode/saveEntityNode',data).pipe(
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
    updateEntityNode(data:EntityNodeInfoModel):Observable<any>{
      return this.http.post(environment.apiurl+'entitynode/updateEntityNode',data).pipe(
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
    getEntityNodeLists(data:ISelectedCompanyDto):Observable<any>{
      return this.http.post(environment.apiurl+'entitynode/getEntityNodeLists',data).pipe(
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
    getEntityNodeTypeById(data:ISelectedCompanyDto):Observable<any>{
      return this.http.post(environment.apiurl+'entitynode/getEntityNodeTypeById',data).pipe(
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
    cloneEntity(data:CloneDetails):Observable<any>{
      return this.http.post(environment.apiurl+'entitynode/cloneEntity',data).pipe(
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
