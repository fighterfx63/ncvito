import { Component, OnInit } from '@angular/core';
import {Apartment} from "../models/apartment.model";
import {Announcement} from "../models/announcement.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClientService} from "../services/http-client.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'ncvito-announcement-stepper',
  templateUrl: './announcement-stepper.component.html',
  styleUrls: ['./announcement-stepper.component.less']
})
export class AnnouncementStepperComponent implements OnInit {


  apartment: Apartment = new Apartment('', undefined, undefined, undefined);
  announcement: Announcement = new Announcement(this.apartment, Boolean(''), '', undefined, new Date());
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;


  constructor(private _formBuilder: FormBuilder, private httpClientService: HttpClientService , private router: Router, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: [Number(''), [Validators.required, Validators.min(1), , Validators.nullValidator]],
      thirdCtrl: [Number(''), [Validators.required, Validators.min(1), , Validators.nullValidator]],
      fourthCtrl: [Number(''), [Validators.required, Validators.min(1), , Validators.nullValidator]],
    });
    this.secondFormGroup = this._formBuilder.group({
      firstCtrl: [Boolean(''), Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      firstCtrl: [Number(''), Validators.required]
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  create(): void {
    this.httpClientService.createAnnouncements(this.announcement)
      .subscribe(data => {
        this.openSnackBar("You have been created successfully", "OK");
        this.router.navigateByUrl("/");
      });

  };


}

