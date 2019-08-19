import {Apartment} from './apartment.model';
import {UserModel} from "./user.model";

export class Announcement {

  id: bigint;
  author: UserModel;
  apartment: Apartment;
  sale: boolean;
  description: string;
  price: number;
  creationDate: Date;

  constructor(apartment: Apartment, sale: boolean, description: string, price: number, creationDate: Date) {
    this.apartment = apartment;
    this.sale = sale;
    this.description = description;
    this.price = price;
    this.creationDate = creationDate;
  }


}
