import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RolePermissionSavedDto } from '../models/role-permissionDto.model';

@Injectable({
    providedIn:'root'
})
export class RolesService {

    constructor(private http: HttpClient) { }
    getRoles():Observable<any>{
        return this.http.get(environment.apiurl+'rolesmanagement/getRoles').pipe(
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
    saveRoles(rolePermissionSavedDto:RolePermissionSavedDto[]):Observable<any>{
      return this.http.post(environment.apiurl+'rolesmanagement/saveUpdateRoles',rolePermissionSavedDto).pipe(
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
