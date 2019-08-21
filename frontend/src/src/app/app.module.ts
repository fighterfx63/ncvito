import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SignUpComponent} from './sign-up/sign-up.component';

import {SharedModule} from './shared/shared.module';
import {SignInModule} from './sign-in/sign-in.module';
import {FullAdComponent} from "./full-ad/full-ad.component";


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    FullAdComponent
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
