import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdPhotosComponent } from './ad-photos.component';

describe('AdPhotosComponent', () => {
  let component: AdPhotosComponent;
  let fixture: ComponentFixture<AdPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdPhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
