import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from "@angular/common/http/testing";

import {AppRoutingModule} from "../app-routing.module";

import {SignUpComponent} from './sign-up.component';
import {FullAdComponent} from "../full-ad/full-ad.component";
import {SignInComponent} from "../sign-in/sign-in.component";

import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {SharedModule} from "../shared/shared.module";
import {AnnouncementStepperComponent} from "../announcement-stepper/announcement-stepper.component";

import {NotFoundComponent} from "../not-found/not-found.component";


describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let debElem: DebugElement;
  let natElem: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({

      declarations: [SignUpComponent, FullAdComponent, SignInComponent, AnnouncementStepperComponent, NotFoundComponent],

      imports: [
        HttpClientTestingModule,
        AppRoutingModule,
        SharedModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    debElem = fixture.debugElement;
    natElem = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should cause submit() method if [Sign Up] button was clicked', async(() => {
      fixture.detectChanges();
      spyOn(component, 'submit');
      natElem = debElem.query(By.css('button')).nativeElement;

      natElem.click();
      expect(component.submit).toHaveBeenCalledTimes(1);
    })
  )

  it('should cause signUp() method if everything is ok', async(() => {
      fixture.detectChanges();
      natElem = debElem.query(By.css('button')).nativeElement;

      expect(component.isClicked).toEqual(false); // verify that we haven't clicked [Sign Up] button yet

      component.formGroup.get('fNameF').setValue('testFname');
      component.formGroup.get('lNameF').setValue('testLname');
      component.formGroup.get('loginF').setValue('testLogin');
      component.formGroup.get('passwordF').setValue('testPass');
      component.formGroup.get('emailF').setValue('test@gmail.com');
      component.formGroup.get('phoneF').setValue('9171436699');
      expect(component.formGroup.valid.valueOf()).toEqual(true); // verify that FormGroup has valid values

      spyOn(component, 'signUp');

      natElem.click();
      expect(component.signUp).toHaveBeenCalledTimes(1);
    })
  )

  it('should not cause signUp() method if [Sign Up] button has been already clicked', async(() => {
      fixture.detectChanges();
      natElem = debElem.query(By.css('button')).nativeElement;

      expect(component.isClicked).toEqual(false); // verify that we haven't clicked [Sign Up] button yet

      component.formGroup.get('fNameF').setValue('testFname');
      component.formGroup.get('lNameF').setValue('testLname');
      component.formGroup.get('loginF').setValue('testLogin');
      component.formGroup.get('passwordF').setValue('testPass');
      component.formGroup.get('emailF').setValue('test@gmail.com');
      component.formGroup.get('phoneF').setValue('9171436699');
      expect(component.formGroup.valid.valueOf()).toEqual(true); // verify that FormGroup has valid values

      component.isClicked = true; // clicked [Sign Up] button situation simulation
      expect(component.isClicked).toEqual(true); // verify that it's 'true' now

      spyOn(component, 'submit');

      natElem.click();
      expect(component.submit).toHaveBeenCalledTimes(1);

      spyOn(component, 'signUp');

      expect(component.signUp).toHaveBeenCalledTimes(0);
    })
  )

  it('should not cause signUp() method if FormGroup form is invalid', async(() => {
      fixture.detectChanges();
      natElem = debElem.query(By.css('button')).nativeElement;

      expect(component.isClicked).toEqual(false); // verify that we haven't clicked [Sign Up] button yet

      component.formGroup.get('fNameF').setValue('testFname');
      component.formGroup.get('lNameF').setValue('testLname');
      component.formGroup.get('loginF').setValue('testLogin');
      component.formGroup.get('passwordF').setValue('123');
      component.formGroup.get('emailF').setValue('test.com');
      component.formGroup.get('phoneF').setValue('12345');
      expect(component.formGroup.valid.valueOf()).toEqual(false); // verify that FormGroup has invalid values

      spyOn(component, 'submit');

      natElem.click();
      expect(component.submit).toHaveBeenCalledTimes(1);

      spyOn(component, 'signUp');

      expect(component.signUp).toHaveBeenCalledTimes(0);
    })
  )

  it('should not cause signUp() method if FormGroup form is invalid and [Sign Up] button has been already clicked', async(() => {
      fixture.detectChanges();
      natElem = debElem.query(By.css('button')).nativeElement;

      expect(component.isClicked).toEqual(false); // verify that we haven't clicked [Sign Up] button yet

      component.formGroup.get('fNameF').setValue('testFname');
      component.formGroup.get('lNameF').setValue('testLname');
      component.formGroup.get('loginF').setValue('testLogin');
      component.formGroup.get('passwordF').setValue('123');
      component.formGroup.get('emailF').setValue('test.com');
      component.formGroup.get('phoneF').setValue('12345');
      expect(component.formGroup.valid.valueOf()).toEqual(false); // verify that FormGroup has invalid values

      component.isClicked = true; // clicked [Sign Up] button situation simulation
      expect(component.isClicked).toEqual(true); // verify that it's 'true' now

      spyOn(component, 'submit');

      natElem.click();
      expect(component.submit).toHaveBeenCalledTimes(1);

      spyOn(component, 'signUp');

      expect(component.signUp).toHaveBeenCalledTimes(0);
    })
  )

  it('should cause a phone error', async(() => {
    fixture.detectChanges();
    component.formGroup.get('phoneF').setValue('123');
    expect(component.formGroup.get('phoneF').valid).toEqual(false);
  }))

  it('should cause a email error', async(() => {
    fixture.detectChanges();
    component.formGroup.get('emailF').setValue('123@');
    expect(component.formGroup.get('emailF').valid).toEqual(false);
  }))

  it('should cause a password error', async(() => {
    fixture.detectChanges();
    component.formGroup.get('passwordF').setValue('999');
    expect(component.formGroup.get('passwordF').valid).toEqual(false);
  }))

});
