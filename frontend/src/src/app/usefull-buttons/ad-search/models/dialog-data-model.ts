export class DialogDataModel {

  filterURL: string;

  priceFrom: number;
  priceTo: number;
  squareFrom: number;
  squareTo: number;

  anyRoomCount: boolean;
  anyFloorCount: boolean;

  address: string;
  priceLabel: string;
  squareLabel: string;
  roomCountLabel: string;
  floorCountLabel: string;

  formGroupAddress: string;

  sortByLabel: string;

  choseRoomCountArray: boolean[]; // array-storages of chose options
  choseFloorCountArray: boolean[];
  choseSortBy: boolean[];

  constructor() {
    this.resetValues();
  }

  resetValues() {

    this.filterURL = "creationDate_desc_creationDate";

    this.priceFrom = null;
    this.priceTo = null;
    this.squareFrom = null;
    this.squareTo = null;

    this.anyRoomCount = true;
    this.anyFloorCount = true;

    this.address = 'Any';
    this.priceLabel = 'Any';
    this.squareLabel = 'Any';
    this.roomCountLabel = "Any";
    this.floorCountLabel = "Any";

    this.formGroupAddress = "";

    this.sortByLabel = "Creation date " + "↓";

    this.choseRoomCountArray = [true, false, false, false, false, false, false]; // [Any, 1, 2, 3, 4, 5, More than 5] respectively
    this.choseFloorCountArray = [true, false, false, false, false, false, false, false, false, false, false, false]; // [Any, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, More than 10] respectively
    this.choseSortBy = [false, false, /**/ false, false, /**/ false, false, /**/ false, false, /**/ true, false]; // it goes like [SortBy, sortInAscendingOrder]
    // for example, [price, false, /**/ square, false, /**/ roomCount, false, /**/ floorCount, false, /**/ creationDate, false]
    // by default, sortByCreationDate === false

  }


}
