import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SignUpComponent} from "./sign-up/sign-up.component";
import {AnnouncementComponent} from "./announcement/announcement.component";
import {SharedModule} from "./shared/shared.module";
import {AnnouncementListComponent} from "./announcement-list/announcement-list.component";


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    AnnouncementComponent,
    AnnouncementListComponent,
  ],
  imports: [SharedModule],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
