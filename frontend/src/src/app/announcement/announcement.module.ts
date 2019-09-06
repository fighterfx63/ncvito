import {NgModule} from "@angular/core";
import {AnnouncementComponent} from "./announcement.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    AnnouncementComponent,
  ],
  exports: [
    AnnouncementComponent,
  ],
  imports: [
    SharedModule
  ]
})
export class AnnouncementModule {}
