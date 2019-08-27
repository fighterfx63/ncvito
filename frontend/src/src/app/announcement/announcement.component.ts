import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Announcement} from "../models/announcement.model";

@Component({
  selector: 'ncvito-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.less']
})
export class AnnouncementComponent implements OnInit {
  announcements: Announcement[];
   creationDate: string;


  constructor() {

  }

  @Input()
  announcement: Announcement;


  @Output()
  private deleteEmitter = new EventEmitter<Announcement>();
  @Output()
  private editEmitter = new EventEmitter<Announcement>();

  ngOnInit() {

  }
  getCreationDate(){
    return this.creationDate = new Date(this.announcement.creationDate.toString().replace("T", " ")).toDateString();
  }

  delete(): void {
    this.deleteEmitter.emit(this.announcement);

  }

  edit(): void {
    this.editEmitter.emit(this.announcement);
  }


}
