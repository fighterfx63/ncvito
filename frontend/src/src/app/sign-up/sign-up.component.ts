import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserModel} from "../models/user.model";
import {Router} from "@angular/router";
import {HttpService} from "../services/http.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'ncvito-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent implements OnInit {

  formGroup: FormGroup;

  isClicked: boolean;

  constructor(private httpService: HttpService, private router: Router, private _snackBar: MatSnackBar) {

  this.isClicked = false;

    this.formGroup = new FormGroup( {
        fNameF: new FormControl(''),
        lNameF: new FormControl(''),
        loginF: new FormControl(''),
        passwordF: new FormControl(''),
        emailF: new FormControl('', [Validators.email]),
        phoneF: new FormControl('',[Validators.pattern('[6-9]\\d{9}')]),
      }

    );
  }

  ngOnInit() {
  }

  getEmailErrorMessage() {
    return this.formGroup.get('emailF').hasError('email') ? 'Not a valid email' :
      '';
  }

  getPhoneErrorMessage() {
    return this.formGroup.get('phoneF').hasError('pattern') ? 'Not a valid phone number' :
      '';
  }

  getLoginErrorMessage() {
      return this.formGroup.get('loginF').hasError('pattern') ? 'This username has been already used' :
        '';
  }

  submit() {
    if (!this.isClicked && this.formGroup.valid) {
      this.isClicked = true;
      this.signUp();
    }

  }

  signUp() {
    var theUser = new UserModel( this.formGroup.get('fNameF').value,
      this.formGroup.get('lNameF').value,
      this.formGroup.get('loginF').value,
      this.formGroup.get('passwordF').value,
      this.formGroup.get('emailF').value,
      this.formGroup.get('phoneF').value
    );

    this.httpService.post('/registration', theUser).subscribe(
      () => {
        console.log("You have been signed up successfully");
        this.openSnackBar("You have been signed up successfully", "OK");
        this.router.navigateByUrl("/");
        this.isClicked = false;
      },
      response => {
        console.log(response);
        if (response === "User already exists") {
          this.formGroup.get('loginF').setErrors({'pattern': true});
        } else {
          this.openSnackBar("It was unable to sign up. Please, try again later", "OK");
        }
        this.isClicked = false;
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

}