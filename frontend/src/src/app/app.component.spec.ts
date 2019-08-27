import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {NavComponent} from "./nav/nav.component";
import {MatMenuModule} from "@angular/material";
import {LoginService} from "./sign-in/login.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ButtonsComponent} from "./usefull-buttons/buttons/buttons.component";


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatMenuModule
      ],
      declarations: [
        AppComponent,
        NavComponent,
        ButtonsComponent
      ],
      providers: [
        LoginService
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'NC-project'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('NC-project');
  });

  /*it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to NC-project!');
  });*/
});
