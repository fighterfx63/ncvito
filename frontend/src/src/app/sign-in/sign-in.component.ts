import {Component} from '@angular/core';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CredentialsModel} from '../models/credentials.model';

@Component({
  selector: 'ncvito-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  user: CredentialsModel;
  isClicked = false;
  invalidLogin: boolean;

  submit() {
    if (this.form.valid && !this.isClicked) {
      this.isClicked = true;
      this.user = this.form.value;
      this.checkLogin();
      console.log(this.user);
    }
  }

  checkLogin(): void {
    this.loginService.authenticate(this.user.username, this.user.password).subscribe(
      data => {
        this.router.navigate([
          this.loginService.getRedirectUrl()
        ])
        this.invalidLogin = false;
      },
      error => {
        this.openSnackBar('It was unable to sign inc. Please, try again later', 'OK');
        this.invalidLogin = true
        this.isClicked = false;
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }


  getUsernameErrorMessage() {
    return 'Write username!';
  }

  getPasswordErrorMessage() {
    if (this.form.get('password').value === '') {
      return 'Password is required to sign in.';
    } else {
      return 'Password must be six characters or longer.'
    }
  }
}
