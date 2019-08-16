import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { RouterTestingModule } from '@angular/router/testing';

import { AdInfoCardComponent } from './ad-info-card.component';
import {AdPhotosComponent} from "../ad-photos/ad-photos.component";
import {SignUpComponent} from "../sign-up/sign-up.component";

import {SharedModule} from "../shared/shared.module";

describe('AdInfoCardComponent', () => {
  let component: AdInfoCardComponent;
  let fixture: ComponentFixture<AdInfoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdInfoCardComponent, AdPhotosComponent, SignUpComponent ],
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
