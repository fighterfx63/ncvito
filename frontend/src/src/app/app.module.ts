import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SignUpComponent} from "./sign-up/sign-up.component";

import {SharedModule} from "./shared/shared.module";

import {AnnouncementStepperComponent} from './announcement-stepper/announcement-stepper.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import {AnnouncementListComponent} from "./announcements-list/announcements-list.component";


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    AnnouncementStepperComponent,
    NotFoundComponent,
    AnnouncementComponent,
    AnnouncementListComponent
  ],
  imports: [SharedModule],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
