import {Component, OnInit} from '@angular/core';
import {Announcement} from "../models/announcement.model";
import {PageEvent} from "@angular/material";
import {HttpService} from "../services/http.service";
import {SnackbarService} from "../services/snackbar.service";
import {NavigationExtras, Router} from "@angular/router";
import {LoginService} from "../sign-in/login.service";

@Component({
  selector: 'ncvito-announcements-list',
  templateUrl: './announcements-list.component.html',
  styleUrls: ['./announcements-list.component.less']
})
export class AnnouncementsListComponent implements OnInit {


  pageDefault: number = 0;
  sizeDefault: number = 10;
  isEditable: boolean;
  announcements: Announcement[];
  favorites: Announcement[];
  favoriteMap: Map<bigint, boolean> = new Map();
  numberOfElements: number;

  event: PageEvent = new PageEvent();


  setPage(event: PageEvent): PageEvent {
    event.pageSize = this.sizeDefault;
    event.pageIndex = this.pageDefault;

    return event;
  }

  constructor(private httpService: HttpService, private router: Router, private snackBarService: SnackbarService, private loginService: LoginService) {

  }

  ngOnInit() {
    this.getData(this.setPage(this.event));
    this.getFavorites();

  }

  getData(event: PageEvent) {
    this.httpService.getAllAnnouncements(event.pageIndex, event.pageSize)
      .subscribe(response => {
        this.announcements = response['content'];
        this.getNumberOfElements();
      });
  }


  getNumberOfElements() {
    this.httpService.getAll().subscribe(response => {
      this.numberOfElements = response['totalElements'];
      console.log(this.numberOfElements);
    });
  }

  delete(event: Announcement) {
    if (this.loginService.getLogin() == event.author.login) {
      this.isEditable = true;
      this.httpService.deleteAnnouncements(event)
        .subscribe(data => {
          this.announcements = this.announcements.filter(u => u !== event);

        });
    } else {
      this.snackBarService.openSnackBar("ERROR", "OK");
    }
  }


  edit(event: Announcement) {

    if (this.loginService.getLogin() == event.author.login) {
      this.isEditable = true;
      let naviagtionsExtras: NavigationExtras = {state: {event: event}};
      this.router.navigateByUrl('/create', naviagtionsExtras);
    } else {
      this.snackBarService.openSnackBar("ERROR", "OK");
    }


  }

  addFavorites(event: Announcement) {
    console.log(event);
    this.httpService.post('/announcements/favorites/' + event.id, event)
      .subscribe(data => {
        this.getFavorites();
        this.snackBarService.openSnackBar("announcement has been added to favorites", "OK");
      });
    /*    location.reload();*/
  };

  getFavorites() {
    console.log('get favorites');
    this.httpService.getAllFavorites()
      .subscribe(response => {
        this.favorites = <any>response;

        for (let announcement of this.announcements) {
          console.log(this.favorites.some(favorite => favorite.id == announcement.id))
          if ((this.favorites.some(favorite => favorite.id == announcement.id)) == true) {
            console.log('here');
            this.favoriteMap.set(announcement.id, true);

          } else {
            this.favoriteMap.set(announcement.id, false);
          }


        }

        console.log(this.favoriteMap)


      });
  }

  deleteFavorites(event: Announcement) {
    console.log(event);
    this.httpService.deleteFavorites(event).subscribe(data => {
      this.getFavorites();
      this.snackBarService.openSnackBar("announcement has been delete to favorites", "OK");

    });

  };

}



