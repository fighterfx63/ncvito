import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {StorageService} from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(private http: HttpClient, private storageService: StorageService) {
  }

  public getHeaders(): HttpHeaders {
    return new HttpHeaders({Authorization: this.storageService.read('token')});
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
  }


  public post(url: string, object: object): Observable<typeof object> {
    if (this.storageService.contains('token')) {
      const headers = this.getHeaders();
      return this.http.post<typeof object>(environment.url + url, object, {headers})
        .pipe(
          catchError(this.handleError)
        );
    }
    return this.http.post<typeof object>(environment.url + url, object)
      .pipe(
        catchError(this.handleError)
      );
  }


  // first 'if' statement is case of using get request for authentication
  public get(url: string, addedHeaders?: HttpHeaders, object: any = null): Observable<typeof object> {
    if (addedHeaders) {
      const headers = addedHeaders;
      return this.http.get<typeof object>(environment.url + url, {headers})
        .pipe(
          catchError(this.handleError)
        );
    }
    if (this.storageService.contains('token')) {
      const headers = this.getHeaders();
      return this.http.get<typeof object>(environment.url + url, {headers})
        .pipe(
          catchError(this.handleError)
        );
    }
    return this.http.get<typeof object>(environment.url + url)
      .pipe(
        catchError(this.handleError)
      );
  }


  public getAllAnnouncements(page, size) {
    return this.http.get(environment.url + '/announcements?page=' + page + '&size=' + size);
  }


  public getAll() {
    return this.http.get(environment.url + '/announcements/');
  }


  public deleteAnnouncements(announcement) {
    const headers = this.getHeaders();
    return this.http.delete(environment.url + '/announcements/' + announcement.id, {headers});
  }

  public updateAnnoucements(id, announcement) {
    const headers = this.getHeaders();
    return this.http.put(environment.url + '/announcements', announcement, {headers});
  }

  public getAllUsers(page, size) {
    const headers = this.getHeaders();
    return this.http.get(environment.url + '/users?page=' + page + '&size=' + size, {headers});
  }

  public updateUser(id, user) {
    const headers = this.getHeaders();
    console.log('update user');
    return this.http.put(environment.url + "/users", user, {headers});

  }

  public getFavorites(page, size) {
    const headers = this.getHeaders();
    return this.http.get(`${environment.url}/announcements/favorites?page=${page}&size=${size}`, {headers});
  }

  public getPageble(url, page, size) {
    const headers = this.getHeaders();
    return this.http.get(`${environment.url}${url}?page=${page}&size=${size}`, {headers});
  }
}
