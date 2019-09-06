import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {ProfileComponent} from "./profile.component";
import {FavoritesComponent} from "./favorites/favorites.component";
import {MyAnnouncementsComponent} from "./my-announcements/my-announcements.component";
import {MatListModule} from "@angular/material";
import {AnnouncementModule} from "../announcement/announcement.module";
import {UserListComponent} from "../user-list/user-list.component";

@NgModule({
  declarations: [
    FavoritesComponent,
    MyAnnouncementsComponent,
    ProfileComponent,
    UserListComponent
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
