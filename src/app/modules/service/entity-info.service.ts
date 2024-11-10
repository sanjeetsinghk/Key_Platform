import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { EntityInfoModel } from '../models/entity-info.model';
import { EntityTreeModel } from '../models/entity-tree.model';
import { CloneDetails } from '../models/cloneDetails.model';
import { IEntityListModel } from '../models/entity-list.model';
import { PerformanceIndicatorsModel } from '../models/performance-indicators.model';
import { IEntityNodeComponentModel } from '../models/entity-node-component.model';

@Injectable({
    providedIn:'root'
})
export class EntityInfoService {
  performanceIndicators: BehaviorSubject<PerformanceIndicatorsModel[]>;
    constructor(private http: HttpClient,private localStorageService:LocalStorageService) { 
      this.performanceIndicators=new BehaviorSubject<PerformanceIndicatorsModel[]>([]);
    }
    
    setPerformanceIndicators(performanceIndicatorsModel:PerformanceIndicatorsModel[]):void{
      this.performanceIndicators.next(performanceIndicatorsModel);
    }
    getPerformanceIndicators():Observable<PerformanceIndicatorsModel[]>{
      return this.performanceIndicators.asObservable();
    }
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
    cloneEntity(data:CloneDetails):Observable<any>{
      return this.http.post(environment.apiurl+'entity/cloneEntity',data).pipe(
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
    getEntityNodeInfo(id:number):Observable<any>{
      return this.http.get(environment.apiurl+'entitynode/getEntityNodeById?id='+id).pipe(
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
    deleteEntity(data:IEntityListModel[]):Observable<any>{
      return this.http.post(environment.apiurl+'entity/deleteEntity',data).pipe(
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
    saveEntityNodeComponnet(data:IEntityNodeComponentModel):Observable<any>{
      return this.http.post(environment.apiurl+'entity/saveEntityNodeComponent',data).pipe(
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
    getEntityNodeComponnet():Observable<any>{
      return this.http.get(environment.apiurl+'entity/getEntityNodeComponent').pipe(
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
    updateEntityNodeComponent(data:IEntityNodeComponentModel[]):Observable<any>{
      return this.http.post(environment.apiurl+'entity/updateEntityNodeComponent',data).pipe(
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
