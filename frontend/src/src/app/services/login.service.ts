import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpService: HttpService) {
  }

  redirectUrl = '';

  getRedirectUrl(): string {
    const url = this.redirectUrl;
    this.redirectUrl = '';
    return url;
  }

  authenticate(username, password) {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username + ':' + password)});
    return this.httpService.get(environment.url + '/login', undefined, headers).pipe(
      map(
        userData => {
          sessionStorage.setItem('token', btoa(username + ':' + password));
          sessionStorage.setItem('username', username);
          return userData;
        }
      )
    );
  }

  isLoggedIn(): boolean {
    const user = sessionStorage.getItem('username');
    return !user;
  }

  logOut(): void {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
  }
}
