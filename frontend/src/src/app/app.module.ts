import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SignUpComponent} from "./sign-up/sign-up.component";

import {SharedModule} from "./shared/shared.module";

import {AnnouncementStepperComponent} from './announcement-stepper/announcement-stepper.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    AnnouncementStepperComponent,
    NotFoundComponent,
  ],
  imports: [SharedModule],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
