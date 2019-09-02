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
isEditable:boolean;
  constructor(private loginService:LoginService, private httpService:HttpService) {

  }

  @Input()
  announcement: Announcement;


  @Output()
  private deleteEmitter = new EventEmitter<Announcement>();
  @Output()
  private editEmitter = new EventEmitter<Announcement>();
  @Output()
  private favoritesEmitter = new EventEmitter<Announcement>();

  ngOnInit() {
  this.getFavorites();
this.isEditable= this.loginService.getLogin()==this.announcement.author.login;

console.log(this.favorites);
console.log(this.announcement);

    if (this.favorites.includes(this.announcement)){
      this.isFavorites=true;
      console.log(this.favorites)
    }



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

    this.favoritesEmitter.emit(this.announcement);
  }
  deleteFavorites():void{
    this.favoritesEmitter.emit(this.announcement);
  }
  getFavorites() {
    console.log('get favorites');
    this.httpService.getAllFavorites()
      .subscribe(response => {
        this.favorites = response[''];
          ;

      });
  }

}
