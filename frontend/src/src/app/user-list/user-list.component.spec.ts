import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserListComponent} from './user-list.component';
import {FullAdComponent} from "../full-ad/full-ad.component";
import {SignUpComponent} from "../sign-up/sign-up.component";
import {SignInComponent} from "../sign-in/sign-in.component";
import {AnnouncementStepperComponent} from "../announcement-stepper/announcement-stepper.component";
import {NotFoundComponent} from "../not-found/not-found.component";
import {AnnouncementComponent} from "../announcement/announcement.component";
import {AnnouncementsListComponent} from "../announcements-list/announcements-list.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppRoutingModule} from "../app-routing.module";
import {SharedModule} from "../shared/shared.module";
import {UserModel} from "../models/user.model";
import {StorageService} from "../services/storage.service";
import {Mock} from "protractor/built/driverProviders";
import {HttpService} from "../services/http.service";
import {of} from "rxjs";
import {NavComponent} from "../nav/nav.component";

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;


  beforeEach(async(() => {
    let spyHttpService = jasmine.createSpyObj<HttpService>("HttpService", [
      "getAllUsers"]);
    spyHttpService.getAllUsers.and.returnValue(of([]));
    TestBed.configureTestingModule({
      providers: [{provide: HttpService, useValue: spyHttpService}],
      declarations: [FullAdComponent, SignUpComponent, SignInComponent, AnnouncementStepperComponent, NotFoundComponent, AnnouncementComponent, AnnouncementsListComponent, UserListComponent,NavComponent],

      imports: [
        HttpClientTestingModule,
        AppRoutingModule,
        SharedModule
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    const user1: UserModel = new UserModel(undefined, undefined, undefined, undefined, undefined, undefined);
    const user2: UserModel = new UserModel(undefined, undefined, undefined, undefined, undefined, undefined);

    component.userList = [user1, user2];


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
