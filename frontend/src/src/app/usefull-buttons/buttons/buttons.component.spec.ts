import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ButtonsComponent} from './buttons.component';
import {FullAdComponent} from "../../full-ad/full-ad.component";
import {SignUpComponent} from "../../sign-up/sign-up.component";
import {SignInComponent} from "../../sign-in/sign-in.component";
import {AnnouncementStepperComponent} from "../../announcement-stepper/announcement-stepper.component";
import {NotFoundComponent} from "../../not-found/not-found.component";
import {AnnouncementComponent} from "../../announcement/announcement.component";
import {AnnouncementsListComponent} from "../../announcements-list/announcements-list.component";
import {SharedModule} from "../../shared/shared.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {UsefulButtonsModule} from "../useful-buttons.module";
import {AdSearchComponent} from "../ad-search/ad-search.component";

describe('ButtonsComponent', () => {
  let component: ButtonsComponent;
  let fixture: ComponentFixture<ButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FullAdComponent,
        SignUpComponent,
        SignInComponent,
        AnnouncementStepperComponent,
        NotFoundComponent,
        AnnouncementComponent,
        AnnouncementsListComponent,
        ButtonsComponent,
        AdSearchComponent
      ],
      imports: [
        SharedModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
