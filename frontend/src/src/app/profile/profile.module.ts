import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FavoritesComponent} from './favorites/favorites.component';
import {AnnouncementComponent} from "../announcement/announcement.component";
import {SharedModule} from "../shared/shared.module";
import {AppModule} from "../app.module";


@NgModule({
  declarations: [],
  imports: [
    SharedModule
  ]
})
export class ProfileModule {
}
