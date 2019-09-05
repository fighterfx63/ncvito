import {NgModule} from '@angular/core';
import {ButtonsComponent} from './buttons/buttons.component';
import {SharedModule} from '../shared/shared.module';
import {AdSearchComponent} from "./ad-search/ad-search.component";


@NgModule({
  declarations: [ButtonsComponent, AdSearchComponent],
  exports: [
    ButtonsComponent,
    AdSearchComponent
  ],
  imports: [
    SharedModule
  ],
  entryComponents: [AdSearchComponent]
})
export class UsefulButtonsModule {
}
