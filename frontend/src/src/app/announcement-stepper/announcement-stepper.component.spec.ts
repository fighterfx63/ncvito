import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AnnouncementStepperComponent} from './announcement-stepper.component';
import {FullAdComponent} from "../full-ad/full-ad.component";
import {SignUpComponent} from "../sign-up/sign-up.component";
import {SignInComponent} from "../sign-in/sign-in.component";
import {SharedModule} from "../shared/shared.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {NotFoundComponent} from "../not-found/not-found.component";

describe('AnnouncementStepperComponent', () => {
  let component: AnnouncementStepperComponent;
  let fixture: ComponentFixture<AnnouncementStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnnouncementStepperComponent, FullAdComponent, SignUpComponent, SignInComponent, NotFoundComponent],
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
