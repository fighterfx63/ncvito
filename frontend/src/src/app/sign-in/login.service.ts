import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {HttpService} from '../services/http.service';
import {StorageService} from '../services/storage.service';


@Injectable()
export class LoginService {
  constructor(private httpService: HttpService, private storageService: StorageService) {
  }

  private redirectUrl = '';
  isAdmin: boolean = false;

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

    this.storageService.write('token', `basic ${btoa(username + ':' + password)}`);
    console.log(headers);
    return this.httpService.get('/login', headers).pipe(
      map(
        userData => {
          this.storageService.write('username', username);
          this.storageService.write('role', userData['role'])
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
    this.storageService.delete('role');
    this.isAdmin = false;
  }

  public getLogin(): string {
    return sessionStorage.getItem("username");
  }

  isCurrentUserAdmin(){
    if (this.storageService.read('role') == 'ADMIN'){
      this.isAdmin = true;
      console.log('user is admin');
    }
  }
}

