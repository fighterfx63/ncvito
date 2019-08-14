import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import {PlaceholderComponent} from "./placeholder/placeholder.component";
import {APP_BASE_HREF} from "@angular/common";


const routes: Routes = [
  {
    path:'advertisements', component:PlaceholderComponent
  },
  {
    path:'profile', component:PlaceholderComponent
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
