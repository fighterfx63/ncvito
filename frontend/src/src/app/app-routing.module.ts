import {NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {APP_BASE_HREF} from "@angular/common";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {AnnouncementStepperComponent} from "./announcement-stepper/announcement-stepper.component";

const routes: Routes = [
  {path: 'sign-up', component: SignUpComponent},
  {path: 'create', component: AnnouncementStepperComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}]
})
export class AppRoutingModule {

  constructor(private router: Router) {
  }


}
