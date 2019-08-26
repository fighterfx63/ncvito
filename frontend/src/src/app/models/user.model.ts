export class UserModel {

  id: bigint;

  firstName: string;
  lastName: string;
  login: string;
  password: string;
  email: string;
  phone: string;
  role:string;
  banReason: string;
  banExpired: Date;

  constructor(firstName: string,
              lastName: string,
              login: string,
              password: string,
              email: string,
              phone: string) {

    this.firstName = firstName;
    this.lastName = lastName;
    this.login = login;
    this.password = password;
    this.email = email;
    this.phone = phone;

  }
}
