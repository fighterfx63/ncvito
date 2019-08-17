import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import {APP_BASE_HREF} from "@angular/common";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {FullAdComponent} from "./full-ad/full-ad.component";

const routes: Routes = [
  {
    path: 'sign-up', component: SignUpComponent
  },
  {
    path: 'advertisement/:id', component: FullAdComponent
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
