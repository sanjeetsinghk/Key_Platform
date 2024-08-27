import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { EntityInfoModel } from '../models/entity-info.model';

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
    
    
}
