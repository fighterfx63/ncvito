import {Component, OnInit} from '@angular/core';
import {Announcement} from "../../models/announcement.model";
import {PageEvent} from "@angular/material";
import {HttpService} from "../../services/http.service";
import {NavigationExtras, Router} from "@angular/router";
import {SnackbarService} from "../../services/snackbar.service";
import {SearchService} from "../../services/search.service";
import {LoginService} from "../../sign-in/login.service";

@Component({
  selector: 'ncvito-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.less']
})
export class FavoritesComponent implements OnInit {

  pageDefault: number = 0;
  sizeDefault: number = 10;

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

  constructor(
    private httpService: HttpService,
    private router: Router,
    private snackBarService: SnackbarService,
    private searchService: SearchService,
    private loginService: LoginService) {
  }

  ngOnInit() {
    this.getData(this.setPage(this.event));


  }

  getData(event: PageEvent) {
    this.httpService.getFavorites(event.pageIndex, event.pageSize)
      .subscribe(response => {
        this.announcements = response['content'];
        this.getNumberOfElements();
      });
  }

  getNumberOfElements() {
    this.httpService.getAllMyFavorites().subscribe(response => {
      this.numberOfElements = response['totalElements'];
      console.log(this.numberOfElements);
    });
  }

  delete(event: Announcement) {
    this.httpService.deleteAnnouncements(event)
      .subscribe(data => {
        this.announcements = this.announcements.filter(u => u !== event);

      });

  }


  edit(event: Announcement) {
    console.log(event);
    let navigationsExtras: NavigationExtras = {state: {event: event}};
    this.router.navigateByUrl('/create', navigationsExtras);
  }

}
