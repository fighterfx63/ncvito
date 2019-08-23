import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SharedModule} from "../shared/shared.module";
import {SignInComponent} from './sign-in.component';
import {SignUpComponent} from "../sign-up/sign-up.component";
import {FullAdComponent} from "../full-ad/full-ad.component";
import {LoginService} from "./login.service";
import {AnnouncementStepperComponent} from "../announcement-stepper/announcement-stepper.component";
import {NotFoundComponent} from "../not-found/not-found.component";
import {AnnouncementComponent} from "../announcement/announcement.component";
import {AnnouncementsListComponent} from "../announcements-list/announcements-list.component";

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FullAdComponent, SignUpComponent, SignInComponent, AnnouncementStepperComponent,NotFoundComponent,AnnouncementComponent,AnnouncementsListComponent],
      imports: [SharedModule],
      providers: [LoginService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
