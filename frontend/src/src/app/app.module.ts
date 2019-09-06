import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SharedModule} from './shared/shared.module';
import {AnnouncementStepperComponent} from './announcement-stepper/announcement-stepper.component';
import {SignInModule} from './sign-in/sign-in.module';
import {FullAdComponent} from "./full-ad/full-ad.component";
import {NavComponent} from "./nav/nav.component";
import {NotFoundComponent} from './not-found/not-found.component';
import {UsefulButtonsModule} from './usefull-buttons/useful-buttons.module';
import {AnnouncementComponent} from './announcement/announcement.component';
import {AnnouncementsListComponent} from './announcements-list/announcements-list.component';
import {UserListComponent} from './user-list/user-list.component';
import {MatListModule} from "@angular/material";
import {AnnouncementModule} from "./announcement/announcement.module";
import {ProfileModule} from "./profile/profile.module";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SignUpComponent,
    FullAdComponent,
    AnnouncementStepperComponent,
    NotFoundComponent,
    AnnouncementsListComponent,
  ],
  imports: [
    SharedModule,
    SignInModule,
    UsefulButtonsModule,
    MatListModule,
    ProfileModule,
    AnnouncementModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
