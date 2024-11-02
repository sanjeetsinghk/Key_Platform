import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { EntityInfoModel } from '../models/entity-info.model';
import { EntityTreeModel } from '../models/entity-tree.model';
import { ScenarioDto } from '../models/scenarioDto';
import { IEntityListModel } from '../models/entity-list.model';

@Injectable({
    providedIn:'root'
})
export class ScenarioService {
    constructor(private http: HttpClient,private localStorageService:LocalStorageService) { }
    
    saveScenario(data:ScenarioDto):Observable<any>{
        return this.http.post(environment.apiurl+'scenario/saveScenario',data).pipe(
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
    
    updateScenarioType(data:EntityInfoModel):Observable<any>{
        return this.http.post(environment.apiurl+'scenario/updateScenario',data).pipe(
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
        return this.http.get(environment.apiurl+'scenario/getScenarioById?id='+id).pipe(
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
    getScenarioList():Observable<any>{
        return this.http.get(environment.apiurl+'scenario/getScenarioList').pipe(
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
    getScenarioTreeDetails(id:number):Observable<any>{
      return this.http.get(environment.apiurl+'scenario/getScenarioTreeDetails?id='+id).pipe(
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
    updateScenarioTree(data:EntityTreeModel):Observable<any>{
      return this.http.post(environment.apiurl+'scenario/updateScenarioTree',data).pipe(
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
    deleteScenario(data:IEntityListModel[]):Observable<any>{
      return this.http.post(environment.apiurl+'scenario/deleteScenario',data).pipe(
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
