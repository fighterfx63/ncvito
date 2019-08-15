import {Component, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material';
import {HttpClientService} from '../services/http-client.service';
import {Announcement} from '../models/announcement.model';

@Component({
  selector: 'app-announcement-list',
  templateUrl: './announcement-list.component.html',
  styleUrls: ['./announcement-list.component.css']
})
export class AnnouncementListComponent implements OnInit {


  pageDefault: number = 0;
  sizeDefault: number = 10;

  announcements: Announcement[];

  numberOfElements: number;

  event2: PageEvent = new PageEvent();


  setPage(event: PageEvent): PageEvent {
    event.pageSize = this.sizeDefault;
    event.pageIndex = this.pageDefault;

    return event;
  }

  constructor(private httpClientService: HttpClientService) {

  }

  ngOnInit() {
    this.getData(this.setPage(this.event2));


  }

  getData(event: PageEvent) {


    this.httpClientService.getAllAnnouncements(event.pageIndex, event.pageSize)
      .subscribe(response => {
        this.announcements = response['content'];
        this.getNumberOfElements();
      });
  }


  getNumberOfElements() {
    this.httpClientService.getAll().subscribe(response => {
      this.numberOfElements = response['numberOfElements'];
    });
  }

  delete(event: Announcement) {
    console.log(event);
    this.httpClientService.deleteAnnouncements(event)
      .subscribe(data => {
        this.announcements = this.announcements.filter(u => u !== event);
      this.getNumberOfElements();

      });

  }
}
