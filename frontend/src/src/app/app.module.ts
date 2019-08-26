import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {SignUpComponent} from "./sign-up/sign-up.component";
import {SharedModule} from "./shared/shared.module";
import {AnnouncementStepperComponent} from './announcement-stepper/announcement-stepper.component';
import {SignInModule} from './sign-in/sign-in.module';
import {FullAdComponent} from "./full-ad/full-ad.component";
import { NotFoundComponent } from './not-found/not-found.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { AnnouncementsListComponent } from './announcements-list/announcements-list.component';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    FullAdComponent,
    AnnouncementStepperComponent,
    NotFoundComponent,
    AnnouncementComponent,
    AnnouncementsListComponent,
    UserListComponent,

  ],
  imports: [
    SharedModule,
    SignInModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
