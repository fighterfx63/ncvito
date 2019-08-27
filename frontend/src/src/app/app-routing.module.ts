import {NgModule} from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import {APP_BASE_HREF} from "@angular/common";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {FullAdComponent} from "./full-ad/full-ad.component";
import {SignInComponent} from './sign-in/sign-in.component';
import {AnnouncementStepperComponent} from "./announcement-stepper/announcement-stepper.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {AnnouncementsListComponent} from "./announcements-list/announcements-list.component";

const routes: Routes = [
  {path: 'sign-up', component: SignUpComponent},
  {path: 'advertisement/:id', component: FullAdComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'create', component: AnnouncementStepperComponent},
  {path: 'announcements', component: AnnouncementsListComponent},
  {path: '**', component: NotFoundComponent}
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
