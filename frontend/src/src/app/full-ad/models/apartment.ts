export class Apartment {

  address: string;
  square : number;
  roomCount: number;
  floor: number;

  constructor(address: string,
              square : number,
              roomCount: number,
              floor: number) {

    this.address = address;
    this.square = square;
    this.roomCount = roomCount;
    this.floor = floor;
  }

}
