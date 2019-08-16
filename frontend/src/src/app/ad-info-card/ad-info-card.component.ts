import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material";
import {HttpService} from "../services/http.service";
import {Advertisement} from "../models/advertisement";
import {Router} from "@angular/router";

@Component({
  selector: 'ncvito-ad-info-card',
  templateUrl: './ad-info-card.component.html',
  styleUrls: ['./ad-info-card.component.less']
})
export class AdInfoCardComponent implements OnInit {

  adCreationDate: string;
  address: string;
  price: number;
  square: number;
  roomCount: number;
  floor: number;
  adType: string;
  description: string;
  author: string;
  phone: string;

  HeartFill: string;
  isHeartLocked: boolean;

  advertisement: Advertisement;

  constructor(private _snackBar: MatSnackBar, private httpService: HttpService, private router: Router) {

    //this.initDummy();
    this.getTheAdvertisement();

    this.HeartFill = "outline";
    this.isHeartLocked = false;
  }

  ngOnInit() {
  }

  getTheAdvertisement(){
    this.httpService.get("http://localhost:8080/announcements/4", this.advertisement).subscribe(
      ad => {
      this.advertisement = ad;

      this.adCreationDate = new Date(this.advertisement.creationDate.toString().replace("T", " ")).toDateString();
      this.address = this.advertisement.apartment.address;
      this.price = this.advertisement.price;
      this.square = this.advertisement.apartment.square;
      this.roomCount = this.advertisement.apartment.roomCount;
      this.floor = this.advertisement.apartment.floor;
      this.adType = this.getAdType(this.advertisement.isSale);
      this.description = this.advertisement.description;
      this.author = this.advertisement.author.firstName + " " + this.advertisement.author.lastName;
      this.phone = this.advertisement.author.phone;

      this.openSnackBar("Success", "OK");
      },
      response => {
        this.router.navigateByUrl("/");
        console.log(response);
        this.openSnackBar("It was unable to load the advertisement. Please, try again later", "OK");
      }
    );
  }

  getAdType(isForSale: boolean) {
    if (isForSale) {
      return "Selling";
    } else {
      return "Leasing";
    }
  }

  switchHeartFill(){
    this.isHeartLocked = true;
    if (this.HeartFill === "outline") {
      this.HeartFill = "";
      this.openSnackBar("This advertisement is your favorite now", "OK");
    } else {
      this.HeartFill = "outline";
      this.openSnackBar("This advertisement is not your favorite one anymore", "OK");
    }
    this.isHeartLocked = false;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  initDummy() {
    /*let date = new Date('2020-05-10 10:23:54');
    this.adCreationDate = date.toDateString();*/
    this.address = "*Address*";
    this.price = 148500;
    this.square = 112;
    this.roomCount = 4;
    this.floor = 5;
    this.adType = "Selling";
    this.description = "*Apartment description*";
  }

}
