import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {HttpService} from '../services/http.service';
import {StorageService} from '../services/storage.service';
import {SignInModule} from './sign-in.module';


@Injectable({
  providedIn: SignInModule
})
export class LoginService {
  constructor(private httpService: HttpService, private storageService: StorageService) {
  }

  private redirectUrl = '';

  public getRedirectUrl(): string {
    try {
      return this.redirectUrl;
    } finally {
      this.redirectUrl = '';
    }
  }

  public setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  public authenticate(username, password) {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username + ':' + password)});
    return this.httpService.get(environment.url + '/login', headers).pipe(
      map(
        userData => {
          this.storageService.write('token', `basic ${btoa(username + ':' + password)}`);
          this.storageService.write('username', username);
          return userData;
        }
      )
    );
  }

  public isLoggedIn(): boolean {
    return this.storageService.contains('username');
  }

  public logOut(): void {
    this.storageService.delete('username');
    this.storageService.delete('token');
  }
}
