export class AuthorModel {

  firstName: string;
  lastName: string;
  phone: string;

  constructor(firstName: string,
              lastName: string,
              phone: string) {

    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;

  }

}
