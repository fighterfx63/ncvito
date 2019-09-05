import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private search = new Subject<void>();

  private url;

  constructor() {
    this.url = "creationDate_desc_creationDate";
  }

  beginSearch() {
    this.search.next();
  }

  subSearch(): Observable<void> {
    return this.search.asObservable();
  }

  getUrl() {
    return this.url;
  }

  setUrl (url:string) {
    this.url = url;
  }

}
