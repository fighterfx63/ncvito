import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from "../app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatMenuModule,
  MatPaginatorModule, MatRadioModule,
  MatSnackBarModule,
  MatStepperModule,

} from '@angular/material'


const modules = [
  CommonModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  AppRoutingModule,
  HttpClientModule,
  BrowserModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  FormsModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatStepperModule,
  MatMenuModule,
  MatIconModule,
  MatMenuModule,
  MatIconModule,
  MatGridListModule,
  MatPaginatorModule,
  MatRadioModule,
];

@NgModule({
  declarations: [],
  imports: [
    modules
  ],
  exports: [
    modules
  ]
})

export class SharedModule {
}
