import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { RouterTestingModule } from '@angular/router/testing';

import { FullAdComponent } from './full-ad.component';
import {SignUpComponent} from "../sign-up/sign-up.component";
import {SignInComponent} from "../sign-in/sign-in.component";

import {SharedModule} from "../shared/shared.module";

describe('FullAddComponent', () => {
  let component: FullAdComponent;
  let fixture: ComponentFixture<FullAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullAdComponent, SignUpComponent, SignInComponent],
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
