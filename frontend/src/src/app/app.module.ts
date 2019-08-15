import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {SignUpComponent} from "./sign-up/sign-up.component";

import {SharedModule} from "./shared/shared.module";



@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent
  ],
  imports: [SharedModule],
  exports:[],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
