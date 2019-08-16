import {Injectable} from '@angular/core';

import {Announcement} from '../models/announcement.model';

import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient) {
  }

  public getAllAnnouncements(page, size) {
    return this.httpClient.get(environment.url + 'announcements?page=' + page + '&size=' + size);
  }

  public createAnnouncements(announcement) {
    return this.httpClient.post<Announcement>(environment.url + '/announcements', announcement);
  }

  public getAll() {
    return this.httpClient.get(environment.url + 'announcements');
  }


  public deleteAnnouncements(announcement) {
    return this.httpClient.delete(environment.url + 'announcement/' + announcement.id);
  }
}
