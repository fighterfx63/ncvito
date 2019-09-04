import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Announcement} from "../models/announcement.model";
import {StorageService} from "../services/storage.service";
import {LoginService} from "../sign-in/login.service";
import {HttpService} from "../services/http.service";

@Component({
  selector: 'ncvito-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.less']
})
export class AnnouncementComponent implements OnInit {
  announcements: Announcement[];
  creationDate: string;
  isFavorites: boolean;
  favorites: Announcement[];
  isEditable: boolean;

  constructor(private loginService: LoginService, private httpService: HttpService) {

  }

  @Input()
  announcement: Announcement;
  @Input()
  isFavorite:boolean;


  @Output()
  private deleteEmitter = new EventEmitter<Announcement>();
  @Output()
  private editEmitter = new EventEmitter<Announcement>();
  @Output()
  private AddFavoritesEmitter = new EventEmitter<Announcement>();
  @Output()
  private DeleteFavoritesEmitter=  new EventEmitter<Announcement>();

  ngOnInit() {
    console.log(this.isFavorite , this.announcement.id);
    this.isEditable = this.loginService.getLogin() == this.announcement.author.login  ;

  }

  getCreationDate() {
    return this.creationDate = new Date(this.announcement.creationDate.toString().replace("T", " ")).toDateString();
  }

  delete(): void {
    this.deleteEmitter.emit(this.announcement);

  }

  edit(): void {
    this.editEmitter.emit(this.announcement);
  }

  addFavorites(): void {

    this.AddFavoritesEmitter.emit(this.announcement);
  }

  deleteFavorites(): void {
    this.DeleteFavoritesEmitter.emit(this.announcement);
  }



}
