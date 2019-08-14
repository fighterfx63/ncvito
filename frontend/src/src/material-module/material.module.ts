import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatStepperModule,
  MatSnackBarModule,
  MatMenuModule
} from '@angular/material';

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatStepperModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatSnackBarModule, MatMenuModule
];
@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
