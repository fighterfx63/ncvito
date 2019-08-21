export class Apartment {

  public id: number;
  public address: string;
  public square: number;
  public roomCount: number;
  public floor: number;


  constructor( address: string, square: number, roomCount: number, floor: number) {
    this.address = address;
    this.square = square;
    this.roomCount = roomCount;
    this.floor = floor;
  }
}
