import {Component} from '@angular/core';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CredentialsModel} from './credentials.model';
import {SnackbarService} from '../services/snackbar.service';

@Component({
  selector: 'ncvito-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {
  }

  private form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  private user: CredentialsModel;
  private isClicked = false;
  private invalidLogin: boolean;

  private submit() {
    if (this.form.valid && !this.isClicked) {
      this.isClicked = true;
      this.user = this.form.value;
      this.checkLogin();
      console.log(this.user);
    }
  }

  private checkLogin(): void {
    this.loginService.authenticate(this.user.username, this.user.password).subscribe(
      data => {
        this.router.navigate([
          this.loginService.getRedirectUrl()
        ]);
        this.invalidLogin = false;
      },
      error => {
        this.snackbarService.openSnackBar('It was unable to sign in. Please, try again later', 'OK');
        this.invalidLogin = true;
        this.isClicked = false;
      }
    );
  }


  private getUsernameErrorMessage() {
    return 'Write username!';
  }

  private getPasswordErrorMessage() {
    if (this.form.get('password').value === '') {
      return 'Password is required to sign in.';
    } else {
      return 'Password must be six characters or longer.';
    }
  }
}
