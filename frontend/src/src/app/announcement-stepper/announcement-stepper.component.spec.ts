import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AnnouncementStepperComponent} from './announcement-stepper.component';
import {FullAdComponent} from "../full-ad/full-ad.component";
import {SignUpComponent} from "../sign-up/sign-up.component";
import {SignInComponent} from "../sign-in/sign-in.component";
import {SharedModule} from "../shared/shared.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {NotFoundComponent} from "../not-found/not-found.component";
import {AnnouncementComponent} from "../announcement/announcement.component";
import {AnnouncementsListComponent} from "../announcements-list/announcements-list.component";
import {UserListComponent} from "../user-list/user-list.component";
import {HttpService} from "../services/http.service";
import {of} from "rxjs";
import {NavComponent} from "../nav/nav.component";
import {AdSearchComponent} from "../usefull-buttons/ad-search/ad-search.component";

describe('AnnouncementStepperComponent', () => {
  let component: AnnouncementStepperComponent;
  let fixture: ComponentFixture<AnnouncementStepperComponent>;

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
    fixture = TestBed.createComponent(AnnouncementStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
