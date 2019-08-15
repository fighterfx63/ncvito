import {Injectable} from '@angular/core';

import {Announcement} from '../models/announcement.model';

import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient) {
  }

  public getAllAnnouncements(page, size) {
    console.log('test call');
    return this.httpClient.get('http://localhost:8080/announcements?page=' + page + '&size=' + size);
  }

  public createAnnouncements(announcement) {
    return this.httpClient.post<Announcement>('http://localhost:8080/announcements', announcement);
  }

  public getAll() {
    return this.httpClient.get('http://localhost:8080/announcements');
  }


  public deleteAnnouncements(announcement) {
    return this.httpClient.delete('http://localhost:8080/announcements/' + announcement.id);
  }
}
