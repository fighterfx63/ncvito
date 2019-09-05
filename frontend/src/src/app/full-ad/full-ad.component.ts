import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material";
import {HttpService} from "../services/http.service";
import {AdvertisementModel} from "./models/advertisement.model";
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ncvito-full-ad',
  templateUrl: './full-ad.component.html',
  styleUrls: ['./full-ad.component.less']
})
export class FullAdComponent implements OnInit {

  ad_ID: string;
  advertisement: AdvertisementModel;

  adCreationDate: string;
  address: string;
  price: string;
  square: number;
  roomCount: number;
  floor: number;
  adType: string;
  description: string;
  author: string;
  phone: string;

  heartFill: string;
  isHeartLocked: boolean;

  roomOrRooms: string;

  constructor(private _snackBar: MatSnackBar, private httpService: HttpService, private router: Router, private route: ActivatedRoute) {

    this.heartFill = "outline";
    this.isHeartLocked = false;
  }

  ngOnInit() {
    this.ad_ID = this.route.snapshot.paramMap.get('id');
    this.checkIfTheAdIsFavorite();

    this.getTheAdvertisement();
  }

  getTheAdvertisement() {
    this.httpService.get("/announcements/" + this.ad_ID, null, this.advertisement).subscribe(
      ad => {
        this.advertisement = ad;

        this.adCreationDate = new Date(this.advertisement.creationDate.toString().replace("T", " ")).toDateString();
        this.address = this.advertisement.apartment.address;
        this.price = this.makePriceParsed(this.advertisement.price);
        this.square = this.advertisement.apartment.square;
        this.roomCount = this.advertisement.apartment.roomCount;
        this.roomOrRooms = this.getRoomOrRooms(this.roomCount);
        this.floor = this.advertisement.apartment.floor;
        this.adType = this.getAdType(this.advertisement.sale);
        this.description = this.advertisement.description;
        this.author = this.advertisement.author.firstName + " " + this.advertisement.author.lastName;
        this.phone = this.advertisement.author.phone;

      },
      response => {
        this.router.navigateByUrl("/");
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

  makePriceParsed(price: number) { // subsidiary method
    let result = price.toString();

    let count: number = (result.length / 3 | 0);
    let temp = result.length - 3;

    for (let i = 0; i < count; i++) {
      if (temp !== 0) {
        result = result.substring(0, temp) + "," + result.substring(temp, result.length);
        temp = temp - 3;
      }
    }
    return result;
  }

  switchHeartFill() {
    this.isHeartLocked = true;
    if (this.heartFill === "outline") {

      this.httpService.post('/announcements/favorites/' + this.ad_ID, this.advertisement)
        .subscribe(data => {
            this.heartFill = "";
            this.openSnackBar("This advertisement is your favorite now", "OK");
          },
          error1 => {
            this.openSnackBar("Error! It was unable to add the announcement to your Favorites", "OK");
          });

    } else {

      this.httpService.deleteFavorites(this.advertisement).subscribe(
        data => {
          this.heartFill = "outline";
          this.openSnackBar("This advertisement is not your favorite one anymore", "OK");
        },
        error1 => {
          this.openSnackBar("Error! It was unable to remove the announcement from your Favorites", "OK");
        });

    }
    this.isHeartLocked = false;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  checkIfTheAdIsFavorite() {
    this.httpService.get("/announcements/favorites/checkIfTheAdIsFavorite/" + this.ad_ID, null, this.advertisement).subscribe(
      () => {
        this.heartFill = "";
      },
      error1 => {
        this.heartFill = "outline";
      }
    )
  }

}
