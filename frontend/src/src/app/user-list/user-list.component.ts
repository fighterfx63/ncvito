import { Component, OnInit } from '@angular/core';
import {HttpService} from "../services/http.service";
import {UserModel} from "../models/user.model";
import {Announcement} from "../models/announcement.model";
import {PageEvent} from "@angular/material";
import {SnackbarService} from "../services/snackbar.service";
import {Router} from "@angular/router";

@Component({
  selector: 'ncvito-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['login', 'role'];
  userList: UserModel[];

  test:string;
  isBanned:boolean;

  pageDefault: number = 0;
  sizeDefault: number = 10;

  announcements: Announcement[];

  numberOfElements: number;

  event: PageEvent = new PageEvent();


  setPage(event: PageEvent): PageEvent {
    event.pageSize = this.sizeDefault;
    event.pageIndex = this.pageDefault;

    return event;
  }

  constructor(private httpService: HttpService, private router: Router, private snackBarService: SnackbarService) {
  }

  ngOnInit() {
    this.getUserList(this.setPage(this.event));
  }

  getUserList(event: PageEvent) {
    this.httpService.getAllUsers(event.pageIndex, event.pageSize).subscribe(response => {
      this.userList = response['content'];
      this.getNumberOfElements();
    })
  }

  getNumberOfElements() {
    this.httpService.get("/users").subscribe(response => {
      this.numberOfElements = response['totalElements'];
      console.log(this.numberOfElements);

    })
  }

  changeRole(user,value) {
    user.role=[value];
    if(user.role=="BANNED"){
      this.isBanned=true;
    }

    console.log('BANNED');

    this.httpService.updateUser(user.id, user).subscribe(data => {
      this.snackBarService.openSnackBar("User role has been changed", "OK");
    this.router.navigateByUrl("/users");
    });

  }
}
