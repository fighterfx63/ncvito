import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {SignUpComponent} from "./sign-up/sign-up.component";

import {SharedModule} from "./shared/shared.module";
import {FullAdComponent} from "./full-ad/full-ad.component";

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    FullAdComponent
  ],
  imports: [SharedModule],
  exports:[],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
