import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementStepperComponent } from './announcement-stepper.component';

describe('AnnouncementStepperComponent', () => {
  let component: AnnouncementStepperComponent;
  let fixture: ComponentFixture<AnnouncementStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncementStepperComponent ]
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
