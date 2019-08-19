import {AdAuthor} from "./ad-author";
import {Apartment} from "./apartment";

export class Advertisement {

  creationDate: Date;
  sale: boolean;
  price: number;
  description: string;

  author: AdAuthor;
  apartment: Apartment;

  constructor(creationDate: Date,
              is_sale: boolean,
              price: number,
              description: string,

              author: AdAuthor,
              apartment: Apartment) {

    this.creationDate = creationDate;
    this.sale = is_sale;
    this.price = price;
    this.description = description;

    this.author = author;
    this.apartment = apartment;
  }

}
