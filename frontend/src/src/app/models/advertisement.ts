import {AdAuthor} from "./ad-author";
import {Apartment} from "./apartment";

export class Advertisement {

  creationDate: Date;
  isSale: boolean;
  price: number;
  description: string;

  author: AdAuthor;
  apartment: Apartment;

  constructor(creationDate: Date,
              isSale: boolean,
              price: number,
              description: string,

              author: AdAuthor,
              apartment: Apartment) {

    this.creationDate = creationDate;
    this.isSale = isSale;
    this.price = price;
    this.description = description;

    this.author = author;
    this.apartment = apartment;
  }

}
