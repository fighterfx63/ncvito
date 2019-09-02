import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {ProfileComponent} from "./profile.component";
import {FavoritesComponent} from "./favorites/favorites.component";
import {MyAnnouncementsComponent} from "./my-announcements/my-announcements.component";
import {MatListModule} from "@angular/material";
import {AnnouncementModule} from "../announcement/announcement.module";

@NgModule({
  declarations: [
    FavoritesComponent,
    MyAnnouncementsComponent,
    ProfileComponent
  ],
  exports: [
    ProfileComponent
  ],
  imports: [
    SharedModule,
    MatListModule,
    AnnouncementModule
  ]
})
 export class ProfileModule {}
