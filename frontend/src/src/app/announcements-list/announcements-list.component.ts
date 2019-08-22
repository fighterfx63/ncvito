import {Component, OnInit} from '@angular/core';
import {Announcement} from "../models/announcement.model";
import {PageEvent} from "@angular/material";
import {HttpService} from "../services/http.service";
import {SnackbarService} from "../services/snackbar.service";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'ncvito-announcements-list',
  templateUrl: './announcements-list.component.html',
  styleUrls: ['./announcements-list.component.less']
})
export class AnnouncementsListComponent implements OnInit {


  pageDefault: number = 0;
  sizeDefault: number = 10;

  announcements: Announcement[];

  numberOfElements: number;

  event: PageEvent = new PageEvent();


  setPage(event: PageEvent): PageEvent {
    event.pageSize = this.sizeDefault;
    event.pageIndex = this.pageDefault;

    return event;
  }

  constructor(private httpService: HttpService, private router: Router, private snackBarService: SnackbarService) {

  }

  ngOnInit() {
    this.getData(this.setPage(this.event));


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
      this.numberOfElements = response['numberOfElements'];
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
    let naviagtionsExtras: NavigationExtras = {state: {event: event}};
    this.router.navigateByUrl('/create', naviagtionsExtras);


  }


}
