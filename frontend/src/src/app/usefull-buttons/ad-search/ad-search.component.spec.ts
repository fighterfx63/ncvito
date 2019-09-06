import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdSearchComponent } from './ad-search.component';
import {SignUpComponent} from "../../sign-up/sign-up.component";
import {SignInComponent} from "../../sign-in/sign-in.component";
import {FullAdComponent} from "../../full-ad/full-ad.component";
import {AnnouncementStepperComponent} from "../../announcement-stepper/announcement-stepper.component";
import {AnnouncementsListComponent} from "../../announcements-list/announcements-list.component";
import {AnnouncementComponent} from "../../announcement/announcement.component";

import {SharedModule} from "../../shared/shared.module";
import {NotFoundComponent} from "../../not-found/not-found.component";

describe('AdSearchComponent', () => {
  let component: AdSearchComponent;
  let fixture: ComponentFixture<AdSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdSearchComponent,
        SignInComponent,
        SignUpComponent,
        FullAdComponent,
        AnnouncementStepperComponent,
        NotFoundComponent,
        AnnouncementsListComponent,
        AnnouncementComponent],
      imports: [
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
