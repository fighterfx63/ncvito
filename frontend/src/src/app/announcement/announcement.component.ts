import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Announcement} from '../models/announcement.model';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {

  constructor() {

  }
  @Input()
  announcement: Announcement;

  @Output()
  private deleteEmitter = new EventEmitter<Announcement>();

  ngOnInit() {

  }
  delete(): void {
    console.log('test call')
    this.deleteEmitter.emit(this.announcement);

  }


}
