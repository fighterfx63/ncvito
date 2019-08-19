import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material";
import {HttpService} from "../services/http.service";
import {Advertisement} from "./models/advertisement";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ncvito-full-ad',
  templateUrl: './full-ad.component.html',
  styleUrls: ['./full-ad.component.less']
})
export class FullAdComponent implements OnInit {

  ad_ID: string;
  advertisement: Advertisement;

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

  roomOrRooms: string;

  constructor(private _snackBar: MatSnackBar, private httpService: HttpService, private router: Router, private route: ActivatedRoute) {

    this.HeartFill = "outline";
    this.isHeartLocked = false;
  }

  ngOnInit() {
    this.ad_ID = this.route.snapshot.paramMap.get('id');

    this.getTheAdvertisement();
  }

  getTheAdvertisement(){
    this.httpService.get("http://localhost:8080/announcements/" + this.ad_ID, this.advertisement).subscribe(
      ad => {
      this.advertisement = ad;

      this.adCreationDate = new Date(this.advertisement.creationDate.toString().replace("T", " ")).toDateString();
      this.address = this.advertisement.apartment.address;
      this.price = this.advertisement.price;
      this.square = this.advertisement.apartment.square;
      this.roomCount = this.advertisement.apartment.roomCount; this.roomOrRooms = this.getRoomOrRooms(this.roomCount);
      this.floor = this.advertisement.apartment.floor;
      this.adType = this.getAdType(this.advertisement.sale);
      this.description = this.advertisement.description;
        // this.description = "q".repeat(1795);
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

  getRoomOrRooms(roomCount: number) {
    if (roomCount === 1) {
      return "room";
    } else {
      return "rooms";
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

}
