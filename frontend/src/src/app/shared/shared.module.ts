import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from "../app-routing.module";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {MaterialModule} from "../../material-module/material.module";
import {HttpClientModule} from "@angular/common/http";
import {
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatStepperModule,
  MatMenuModule, MatGridListModule, MatIconModule
} from '@angular/material'

const modules = [
  CommonModule,
  ReactiveFormsModule,
  MaterialModule,
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
  MatGridListModule,
  MatIconModule
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
