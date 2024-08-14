import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable()
export class CountryService {

    constructor(private http: HttpClient) { }

    getCountries():Observable<any> {
        return this.http.get<any>('assets/demo/data/countries.json').pipe(
            map((response) => {
              // prepare the response to be handled, then return
             return response.data;
            }),
            // if we are setting cookie on server, this is the place to call local server
            //switchMap((user) => this.SetLocalSession(user)),
            catchError((error)=>{
              return throwError(error || 'server error.')
            })
          );
           
    }
}
