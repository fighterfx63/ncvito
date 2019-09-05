import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriceParsingService {

  constructor() { }

  parsePrice(price: number) {
    let result = price.toString();

    let count: number = (result.length / 3 | 0);
    let temp = result.length - 3;

    for (let i = 0; i < count; i++) {
      if (temp !== 0) {
        result = result.substring(0, temp) + "," + result.substring(temp, result.length);
        temp = temp - 3;
      }
    }
    return result;
  }
}
