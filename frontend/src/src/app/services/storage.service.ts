import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public write(key: string, content: string) {
    sessionStorage.setItem(key, content);
  }

  public read(key: string) {
    const item = sessionStorage.getItem(key);
    if (!item) {
      throw new Error(`item ${key} is not found.`);
    }
    return item;
  }

  public delete(key: string) {
    sessionStorage.removeItem(key);
  }

  public contains(key: string): boolean {
    const item = sessionStorage.getItem(key);
    if (!item) {
      console.log(`item ${key} is not found.`);
    } else {
      console.log(`item ${key} is found.`);
    }
    return (item !== null);
  }
}
