import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {SignUpComponent} from "./sign-up/sign-up.component";
import {SharedModule} from "./shared/shared.module";
import {AnnouncementStepperComponent} from './announcement-stepper/announcement-stepper.component';
import {SignInModule} from './sign-in/sign-in.module';
import {FullAdComponent} from "./full-ad/full-ad.component";
import {NavComponent} from "./nav/nav.component";
import { NotFoundComponent } from './not-found/not-found.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { AnnouncementsListComponent } from './announcements-list/announcements-list.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SignUpComponent,
    FullAdComponent,
    AnnouncementStepperComponent,
    NotFoundComponent,
    AnnouncementComponent,
    AnnouncementsListComponent,
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
