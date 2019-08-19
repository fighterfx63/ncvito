import {NgModule} from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SignInComponent} from './sign-in/sign-in.component';

const routes: Routes = [
  {
    path: 'sign-up', component: SignUpComponent
  },
  {
    path: 'sign-in', component: SignInComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}]
})
export class AppRoutingModule {

  constructor(private router: Router) {
  }

  goTo(url) {
    this.router.navigateByUrl(url);
  }
}
