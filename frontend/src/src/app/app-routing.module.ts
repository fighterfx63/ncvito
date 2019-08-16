import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import {APP_BASE_HREF} from "@angular/common";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {AdInfoCardComponent} from "./ad-info-card/ad-info-card.component";

const routes: Routes = [
  {
    path: 'sign-up', component: SignUpComponent
  },
  {
    path: 'ad-overview', component: AdInfoCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}]
})
export class AppRoutingModule {

  constructor(private router: Router){}

  goTo(url) {
    this.router.navigateByUrl(url);
  }
}
