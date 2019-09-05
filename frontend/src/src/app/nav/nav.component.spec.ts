import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NavComponent} from './nav.component';
import {LoginService} from "../sign-in/login.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {MatMenuModule} from "@angular/material";
import {SharedModule} from "../shared/shared.module";
import {FullAdComponent} from "../full-ad/full-ad.component";
import {SignUpComponent} from "../sign-up/sign-up.component";
import {SignInComponent} from "../sign-in/sign-in.component";
import {AnnouncementStepperComponent} from "../announcement-stepper/announcement-stepper.component";
import {NotFoundComponent} from "../not-found/not-found.component";
import {AnnouncementComponent} from "../announcement/announcement.component";
import {AnnouncementsListComponent} from "../announcements-list/announcements-list.component";
import {UserListComponent} from "../user-list/user-list.component";
import {AdSearchComponent} from "../usefull-buttons/ad-search/ad-search.component";

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FullAdComponent, SignUpComponent, SignInComponent, AnnouncementStepperComponent, NotFoundComponent, AnnouncementComponent, AnnouncementsListComponent, UserListComponent, NavComponent, AdSearchComponent],

      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatMenuModule
      ],
      providers: [
        LoginService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
