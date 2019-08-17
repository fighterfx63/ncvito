import { Component, OnInit } from '@angular/core';
import {Apartment} from "../models/apartment.model";
import {Announcement} from "../models/announcement.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClientService} from "../services/http-client.service";
import {Router} from "@angular/router";
import {SnackbarService} from "../services/snackbar.service";

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


  constructor(private _formBuilder: FormBuilder, private httpClientService: HttpClientService , private router: Router, private snackBarService : SnackbarService) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', [Validators.required, Validators.min(1), , Validators.nullValidator]],
      thirdCtrl: ['', [Validators.required, Validators.min(1), , Validators.nullValidator]],
      fourthCtrl: ['', [Validators.required, Validators.min(1), , Validators.nullValidator]],
    });
    this.secondFormGroup = this._formBuilder.group({
      firstCtrl: [Boolean(''), Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      firstCtrl: ['']
    });
  }



  create(): void {
    this.httpClientService.createAnnouncements(this.announcement)
      .subscribe(data => {
        this.snackBarService.openSnackBar("You have been created successfully", "OK");
        this.router.navigateByUrl("/");
      });

  };


}

