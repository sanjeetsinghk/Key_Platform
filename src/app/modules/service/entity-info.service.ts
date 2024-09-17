import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { EntityInfoModel } from '../models/entity-info.model';
import { EntityTreeModel } from '../models/entity-tree.model';

@Injectable({
    providedIn:'root'
})
export class EntityInfoService {
    constructor(private http: HttpClient,private localStorageService:LocalStorageService) { }
    
    saveEntityType(data:EntityInfoModel):Observable<any>{
        return this.http.post(environment.apiurl+'entity/saveEntity',data).pipe(
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
    updateEntityType(data:EntityInfoModel):Observable<any>{
        return this.http.post(environment.apiurl+'entity/updateEntity',data).pipe(
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
    getEntityInfo(id:number):Observable<any>{
        return this.http.get(environment.apiurl+'entity/getEntity?id='+id).pipe(
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
    getEntityList():Observable<any>{
        return this.http.get(environment.apiurl+'entity/getEntityList').pipe(
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
    getEntityTreeInfo(id:number):Observable<any>{
      return this.http.get(environment.apiurl+'entity/getEntityTreeDetails?id='+id).pipe(
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
    saveEntityTree(data:EntityTreeModel):Observable<any>{
      return this.http.post(environment.apiurl+'entity/saveEntityTree',data).pipe(
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
    updateEntityTree(data:EntityTreeModel):Observable<any>{
      return this.http.post(environment.apiurl+'entity/updateEntityTree',data).pipe(
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
