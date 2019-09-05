import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AnnouncementComponent} from './announcement.component';
import {NotFoundComponent} from "../not-found/not-found.component";
import {FullAdComponent} from "../full-ad/full-ad.component";
import {SignUpComponent} from "../sign-up/sign-up.component";
import {SignInComponent} from "../sign-in/sign-in.component";
import {AnnouncementStepperComponent} from "../announcement-stepper/announcement-stepper.component";
import {AnnouncementsListComponent} from "../announcements-list/announcements-list.component";
import {SharedModule} from "../shared/shared.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {UserListComponent} from "../user-list/user-list.component";
import {NavComponent} from "../nav/nav.component";
import {AdSearchComponent} from "../usefull-buttons/ad-search/ad-search.component";

describe('AnnouncementComponent', () => {
  let component: AnnouncementComponent;
  let fixture: ComponentFixture<AnnouncementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FullAdComponent, SignUpComponent, SignInComponent, AnnouncementStepperComponent, NotFoundComponent, AnnouncementComponent, AnnouncementsListComponent, UserListComponent, NavComponent, AdSearchComponent],
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementComponent);
    component = fixture.componentInstance;
    component.announcement = {
      id: undefined,
      author: undefined,
      apartment: undefined,
      sale: undefined,
      description: undefined,
      price: undefined,
      creationDate: undefined,
    };


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
