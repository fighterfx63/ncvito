import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SharedModule} from './shared/shared.module';
import {AnnouncementStepperComponent} from './announcement-stepper/announcement-stepper.component';
import {SignInModule} from './sign-in/sign-in.module';
import {FullAdComponent} from './full-ad/full-ad.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {UsefulButtonsModule} from './usefull-buttons/useful-buttons.module';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    FullAdComponent,
    AnnouncementStepperComponent,
    NotFoundComponent,
  ],
  imports: [
    SharedModule,
    SignInModule,
    UsefulButtonsModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
