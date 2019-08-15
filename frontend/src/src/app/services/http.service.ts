import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Client-side error!\n', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        'Server-side error!\n' +
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      return throwError(error.error);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Error!\nSomething bad happened; please try again later.');
  };


  post(url: string, object: Object): Observable<typeof object> {

    const headers= new HttpHeaders({Authorization: 'Basic' + sessionStorage.getItem('token')});
    return this.http.post<typeof object>(environment.url + url, object, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

}
