import { NgModule } from '@angular/core';

import {SharedModule} from "./shared/shared.module";

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PlaceholderComponent
  ],
  imports: [SharedModule],
  exports:[],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
