import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {SignUpComponent} from "./sign-up/sign-up.component";

import {SharedModule} from "./shared/shared.module";
import {AdInfoCardComponent} from "./ad-info-card/ad-info-card.component";
import {AdPhotosComponent} from "./ad-photos/ad-photos.component";



@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    AdInfoCardComponent,
    AdPhotosComponent
  ],
  imports: [SharedModule],
  exports:[],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
