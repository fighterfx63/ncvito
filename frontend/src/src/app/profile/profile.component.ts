import {Component, OnInit} from '@angular/core';
import {UserModel} from "../models/user.model";
import {PageEvent} from "@angular/material";
import {HttpService} from "../services/http.service";
import {Router} from "@angular/router";
import {SnackbarService} from "../services/snackbar.service";
import {LoginService} from "../sign-in/login.service";
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'ncvito-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit{

  show: boolean = false;
  showFav: boolean = true;
  showAdmPan: boolean = false;
  role: string;

  constructor(private storageService: StorageService, private router: Router, private loginService: LoginService) {
  }

  showApp(){
    if (!this.show){
      this.show = true;
      this.showFav = false;
      this.showAdmPan = false;
    }
  }
  showFavorites(){
    if (!this.showFav){
      this.showFav = true;
      this.show = false;
      this.showAdmPan = false;
    }
  }
  showUserList() {
    if (!this.showAdmPan) {
      this.showAdmPan = true;
      this.show = false;
      this.showFav = false;
    }
  }
  ngOnInit(){
  }
}
