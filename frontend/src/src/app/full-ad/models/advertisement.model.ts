import {AuthorModel} from "./author.model";
import {ApartmentModel} from "./apartment.model";

export class AdvertisementModel {

  creationDate: Date;
  sale: boolean;
  price: number;
  description: string;

  author: AuthorModel;
  apartment: ApartmentModel;

  constructor(creationDate: Date,
              is_sale: boolean,
              price: number,
              description: string,

              author: AuthorModel,
              apartment: ApartmentModel) {

    this.creationDate = creationDate;
    this.sale = is_sale;
    this.price = price;
    this.description = description;

    this.author = author;
    this.apartment = apartment;
  }

}
