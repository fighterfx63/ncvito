import {NgModule} from '@angular/core';
import {LoginService} from './login.service';
import {SharedModule} from '../shared/shared.module';
import {SignInComponent} from './sign-in.component';


@NgModule({
  declarations: [
    SignInComponent
  ],
  providers: [
    LoginService
  ],
  imports: [
    SharedModule

  ],
  exports: [
    SignInComponent
  ]
})
export class SignInModule {
}
