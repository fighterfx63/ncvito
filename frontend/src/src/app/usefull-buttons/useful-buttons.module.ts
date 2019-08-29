import { NgModule } from '@angular/core';
import { ButtonsComponent } from './buttons/buttons.component';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  declarations: [ButtonsComponent],
  exports: [
    ButtonsComponent
  ],
  imports: [
    SharedModule
  ]
})
export class UsefulButtonsModule { }
