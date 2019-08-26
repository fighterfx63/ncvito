import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from '../sign-in/login.service';

@Component({
  selector: 'ncvito-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {
  appTitle: string = 'NCvito';

  username(): string {
    return sessionStorage.getItem('username');
  }

  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    this.router.navigate(['']);
  }

}
