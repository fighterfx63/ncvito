import {Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FavoritesComponent} from './favorites/favorites.component';
import {AnnouncementComponent} from "../announcement/announcement.component";
import {SharedModule} from "../shared/shared.module";
import {AppModule} from "../app.module";


/*@NgModule({
  declarations: [],
  imports: [
    SharedModule
  ]
})*/
@Component({
  selector: 'ncvito-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit{

  show: boolean = true;
  showFav: boolean = false;
  showApp(){
    if (!this.show){
      this.show = !this.show;
      this.showFav = !this.showFav;
    }
  }
  showFavorites(){
    if (!this.showFav){
      this.showFav = !this.showFav;
      this.show = !this.show;
    }

  }
  ngOnInit(){
  }
}
