import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpService} from "../../services/http.service";
import {SnackbarService} from "../../services/snackbar.service";
import {Filter} from "./models/filter.model";
import {PriceParsingService} from "../../services/price-parsing.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {DialogDataModel} from "./models/dialog-data-model";

@Component({
  selector: 'ncvito-ad-search',
  templateUrl: './ad-search.component.html',
  styleUrls: ['./ad-search.component.less']
})
export class AdSearchComponent implements OnInit {

  formGroup: FormGroup;

  roomList: string[]; // arrays of available options
  floorList: string[];

  isSubmitClicked: boolean; // some boolean values
  isClearClicked: boolean;

  priceSortOrderLabel: string; // labels (to show which options were chose)
  squareSortOrderLabel: string;
  roomSortOrderLabel: string;
  floorSortOrderLabel: string;
  creationDateSortOrderLabel: string;

  tempSortByLabel: string; // this string stores 'sortByLabel' value, but it should not be seen anywhere
  ascSortSymbol: string;
  descSortSymbol: string;

  constructor(private httpService: HttpService, private snackBarService: SnackbarService, private priceService: PriceParsingService,
              public dialogRef: MatDialogRef<AdSearchComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogDataModel) {

    this.formGroup = new FormGroup({
        address: new FormControl(''),
        priceFrom: new FormControl(),
        priceTo: new FormControl(),
        squareFrom: new FormControl(),
        squareTo: new FormControl()
      }
    );

    this.isSubmitClicked = false;
    this.isClearClicked = false;

    this.roomList = ['1', '2', '3', '4', '5', 'More than 5'];
    this.floorList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'More than 10'];

    this.ascSortSymbol = "↑";
    this.descSortSymbol = "↓";

    this.creationDateSortOrderLabel = this.descSortSymbol;
    this.tempSortByLabel = "Creation Date " + this.creationDateSortOrderLabel;

    this.getDatafromDataModel();

  }

  ngOnInit() {
  }

  private clearValues() {
    this.isClearClicked = true;

    this.data.resetValues();

    this.isClearClicked = false;
  }

  getDatafromDataModel() {
    this.formGroup.get('address').setValue(this.data.formGroupAddress);
    this.formGroup.get('priceFrom').setValue(this.data.priceFrom);
    this.formGroup.get('priceTo').setValue(this.data.priceTo);
    this.formGroup.get('squareFrom').setValue(this.data.squareFrom);
    this.formGroup.get('squareTo').setValue(this.data.squareTo);

    this.priceSortOrderLabel = ""; // sort labels
    this.squareSortOrderLabel = "";
    this.roomSortOrderLabel = "";
    this.floorSortOrderLabel = "";
  }

  private setAddressLabel() {
    if (this.formGroup.get('address').value.toString().trim()) {
      this.data.address = this.formGroup.get('address').value.toString().trim();
      this.data.formGroupAddress = this.data.address;
    } else {
      this.data.address = 'Any';
      this.data.formGroupAddress = "";
    }

  }

  private setPriceLabel() {
    this.data.priceFrom = this.setNullIfEqualsZero(this.formGroup.get('priceFrom').value);
    this.data.priceTo = this.setNullIfEqualsZero(this.formGroup.get('priceTo').value);

    this.data.priceLabel = this.getNumbersRange(this.data.priceFrom, this.data.priceTo);
  }

  private setSquareLabel() {
    this.data.squareFrom = this.setNullIfEqualsZero(this.formGroup.get('squareFrom').value);
    this.data.squareTo = this.setNullIfEqualsZero(this.formGroup.get('squareTo').value);

    this.data.squareLabel = this.getNumbersRange(this.data.squareFrom, this.data.squareTo);
  }

  private setNullIfEqualsZero(number: number) { // subsidiary method
    if (!number) {
      return null;
    } else {
      return number;
    }
  }

  private getNumbersRange(from: number, to: number) { // subsidiary method

    if (from && to) {
      if (from <= to) {
        return this.priceService.parsePrice(from) + " - " + this.priceService.parsePrice(to);
      } else {
        return this.priceService.parsePrice(to) + " - " + this.priceService.parsePrice(from); // IMPORTANT: in this case, backend should revert input values as well, coz frontend actually doesn't revert it
      }
    } else if (!from && to) {
      return "Less than " + this.priceService.parsePrice(to);
    } else if (from && !to) {
      return "More than " + this.priceService.parsePrice(from);
    } else if (!from && !to) {
      return "Any";
    }
  }

  private changeRoomBoxesStatement(id: number) {
    if (!id) {
      if (!this.data.choseRoomCountArray[id]) {
        for (let i = 1; i < this.data.choseRoomCountArray.length; i++) {
          this.data.choseRoomCountArray[i] = false;
        }
        this.data.anyRoomCount = true;
      } else {
        for (let i = 1; i < this.data.choseRoomCountArray.length; i++) {
          this.data.choseRoomCountArray[i] = false;
        }
        this.data.anyRoomCount = false;
      }
    }

    this.data.choseRoomCountArray[id] = !this.data.choseRoomCountArray[id];
  }

  private changeFloorBoxesStatement(id: number) {
    if (!id) {
      if (!this.data.choseFloorCountArray[id]) {
        for (let i = 1; i < this.data.choseFloorCountArray.length; i++) {
          this.data.choseFloorCountArray[i] = false;
        }
        this.data.anyFloorCount = true;
      } else {
        for (let i = 1; i < this.data.choseFloorCountArray.length; i++) {
          this.data.choseFloorCountArray[i] = false;
        }
        this.data.anyFloorCount = false;
      }
    }

    this.data.choseFloorCountArray[id] = !this.data.choseFloorCountArray[id];
  }

  private setRoomCount() {
    if (this.shouldItBeAnyValue(this.data.choseRoomCountArray)) {
      this.data.roomCountLabel = "Any";
    } else {
      let roomsCount = "";
      for (let i = 1; i < this.data.choseRoomCountArray.length; i++) {
        if (this.data.choseRoomCountArray[i]) {
          if (i === 6) {
            roomsCount = roomsCount + i + "+  "; // two spaces to remove them
          } else {
            roomsCount = roomsCount + i + ", ";
          }
        }
      }
      this.data.roomCountLabel = roomsCount.substring(0, roomsCount.length - 2); // to remove last comma
    }
  }

  private setFloorCount() {
    if (this.shouldItBeAnyValue(this.data.choseFloorCountArray)) {
      this.data.floorCountLabel = "Any";
    } else {
      let floorCount = "";
      for (let i = 1; i < this.data.choseFloorCountArray.length; i++) {
        if (this.data.choseFloorCountArray[i]) {
          if (i === 11) {
            floorCount = floorCount + i + "+  "; // two spaces to remove them
          } else {
            floorCount = floorCount + i + ", ";
          }
        }
      }
      this.data.floorCountLabel = floorCount.substring(0, floorCount.length - 2); // to remove last comma
    }
  }

  private shouldItBeAnyValue(array: boolean[]) {  // subsidiary method
    if (array[0]) {
      return true;
    } else {

      let allChoseExceptAny = true; // !array[0]
      let nothingChose = true; // !array[0]

      for (let i = 1; i < array.length; i++) {
        allChoseExceptAny = allChoseExceptAny && array[i];
        nothingChose = nothingChose && !array[i];
      }

      if (allChoseExceptAny) {
        return true;
      } else {
        return nothingChose;
      }
    }

  }

  private changePriceSortOrder(value: boolean) {
    this.turnSortByArrayItemsToFalse();
    this.data.choseSortBy[0] = true;
    if (value) {
      this.data.choseSortBy[1] = false;
      this.priceSortOrderLabel = this.descSortSymbol;
    } else {
      this.data.choseSortBy[1] = true;
      this.priceSortOrderLabel = this.ascSortSymbol;
    }
    this.tempSortByLabel = "Price " + this.priceSortOrderLabel;
  }

  private changeSquareSortOrder(value: boolean) {
    this.turnSortByArrayItemsToFalse();
    this.data.choseSortBy[2] = true;
    if (value) {
      this.data.choseSortBy[3] = false;
      this.squareSortOrderLabel = this.descSortSymbol;
    } else {
      this.data.choseSortBy[3] = true;
      this.squareSortOrderLabel = this.ascSortSymbol;
    }
    this.tempSortByLabel = "Square " + this.squareSortOrderLabel;
  }

  private changeRoomSortOrder(value: boolean) {
    this.turnSortByArrayItemsToFalse();
    this.data.choseSortBy[4] = true;
    if (value) {
      this.data.choseSortBy[5] = false;
      this.roomSortOrderLabel = this.descSortSymbol;
    } else {
      this.data.choseSortBy[5] = true;
      this.roomSortOrderLabel = this.ascSortSymbol;
    }
    this.tempSortByLabel = "Room count " + this.roomSortOrderLabel;
  }

  private changeFloorSortOrder(value: boolean) {
    this.turnSortByArrayItemsToFalse();
    this.data.choseSortBy[6] = true;
    if (value) {
      this.data.choseSortBy[7] = false;
      this.floorSortOrderLabel = this.descSortSymbol;
    } else {
      this.data.choseSortBy[7] = true;
      this.floorSortOrderLabel = this.ascSortSymbol;
    }
    this.tempSortByLabel = "Floor " + this.floorSortOrderLabel;
  }

  private changeCreationDateSortOrder(value: boolean) {
    this.turnSortByArrayItemsToFalse();
    this.data.choseSortBy[8] = true;
    if (value) {
      this.data.choseSortBy[9] = false;
      this.creationDateSortOrderLabel = this.descSortSymbol;
    } else {
      this.data.choseSortBy[9] = true;
      this.creationDateSortOrderLabel = this.ascSortSymbol;
    }
    this.tempSortByLabel = "Creation date " + this.creationDateSortOrderLabel;
  }

  private turnSortByArrayItemsToFalse() { // subsidiary method
    for (let i = 0; i < this.data.choseSortBy.length; i++) {
      this.data.choseSortBy[i] = false;
    }
    this.priceSortOrderLabel = "";
    this.squareSortOrderLabel = "";
    this.roomSortOrderLabel = "";
    this.floorSortOrderLabel = "";
    this.creationDateSortOrderLabel = "";
  }

  private setSortBy() {
    this.data.sortByLabel = this.tempSortByLabel;
  }

  private submit() {
    this.isSubmitClicked = true;

    this.data.filterURL = this.setFilter();
    this.dialogRef.close(this.data);
  }

  private setFilter() {

    let filter = new Array();

    // Address
    let address = this.data.address;
    if (address !== "Any") {
      filter.push(new Filter("address", ":", address));
    }

    // Price
    let priceFrom = this.data.priceFrom;
    let priceTo = this.data.priceTo;

    if (priceFrom && priceTo) {
      if (priceFrom > priceTo) {
        filter.push(new Filter("price", ">", priceTo));
        filter.push(new Filter("price", "<", priceFrom));
      } else {
        filter.push(new Filter("price", ">", priceFrom));
        filter.push(new Filter("price", "<", priceTo));
      }
    } else {
      if (priceFrom) {
        filter.push(new Filter("price", ">", priceFrom));
      }
      if (priceTo) {
        filter.push(new Filter("price", "<", priceTo));
      }
    }

    // Square
    let squareFrom = this.data.squareFrom;
    let squareTo = this.data.squareTo;

    if (squareFrom && squareTo) {
      if (squareFrom > squareTo) {
        filter.push(new Filter("square", ">", squareTo));
        filter.push(new Filter("square", "<", squareFrom));
      } else {
        filter.push(new Filter("square", ">", squareFrom));
        filter.push(new Filter("square", "<", squareTo));
      }
    } else {
      if (squareFrom) {
        filter.push(new Filter("square", ">", squareFrom));
      }
      if (squareTo) {
        filter.push(new Filter("square", "<", squareTo));
      }
    }

    // RoomCount
    if (!(this.data.roomCountLabel === "Any")) {

      let roomArray = new Array();
      for (let i = 1; i < this.data.choseRoomCountArray.length - 1; i++) {
        if (this.data.choseRoomCountArray[i]) {
          roomArray.push(i);
        }
      }

      if (this.data.choseRoomCountArray[6]) {
        roomArray.push(-1);
      }

      filter.push(new Filter("roomCount", "':", roomArray));
    }

    // FloorCount
    if (!(this.data.floorCountLabel === "Any")) {

      let floorArray = new Array();
      for (let i = 1; i < this.data.choseFloorCountArray.length - 1; i++) {
        if (this.data.choseFloorCountArray[i]) {
          floorArray.push(i);
        }
      }

      if (this.data.choseFloorCountArray[11]) {
        floorArray.push(-1);
      }

      filter.push(new Filter("floor", "':", floorArray));
    }

    // SortBy
    let sortBy: string;
    if (this.data.choseSortBy[0]) {
      sortBy = "price";
    } else if (this.data.choseSortBy[2]) {
      sortBy = "square";
    } else if (this.data.choseSortBy[4]) {
      sortBy = "roomCount";
    } else if (this.data.choseSortBy[6]) {
      sortBy = "floor";
    } else if (this.data.choseSortBy[8]) {
      sortBy = "creationDate";
    }

    let sortDirection: string;
    if (this.data.sortByLabel.endsWith(this.ascSortSymbol)) {
      sortDirection = "asc";
    } else if (this.data.sortByLabel.endsWith(this.descSortSymbol)) {
      sortDirection = "desc";
    }

    filter.push(new Filter("sortBy", sortDirection, sortBy));

    let params: string = "";

    for (let i = 0; i < filter.length; i++) {
      params = params + (<Filter>filter[i]).key + "_" + (<Filter>filter[i]).operation + "_" + (<Filter>filter[i]).value + "@";
    }

    return params.slice(0, params.length - 1);
  }

}


