import {Component, OnInit} from '@angular/core';
import {Apartment} from "../models/apartment.model";
import {Announcement} from "../models/announcement.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Router} from "@angular/router";
import {SnackbarService} from "../services/snackbar.service";
import {HttpService} from "../services/http.service";

@Component({
  selector: 'ncvito-announcement-stepper',
  templateUrl: './announcement-stepper.component.html',
  styleUrls: ['./announcement-stepper.component.less']

})
export class AnnouncementStepperComponent implements OnInit {


  apartment: Apartment = new Apartment('', undefined, undefined, undefined);
  announcement: Announcement = new Announcement(this.apartment, false, '', undefined, new Date());
  apartmentInfoFormGroup: FormGroup;
  announcementTypeFormGroup: FormGroup;
  announcementPriceFormGroup: FormGroup;
  announcementDescriptionFormGroup: FormGroup;


  constructor(private _formBuilder: FormBuilder, private httpService: HttpService, private router: Router, private snackBarService: SnackbarService) {
  }

  ngOnInit() {
    this.apartmentInfoFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', [Validators.required, Validators.min(1), , Validators.nullValidator]],
      thirdCtrl: ['', [Validators.required, Validators.min(1), , Validators.nullValidator]],
      fourthCtrl: ['', [Validators.required, Validators.min(1), , Validators.nullValidator]],
    });
    this.announcementTypeFormGroup = this._formBuilder.group({
      firstCtrl: [Boolean(''), Validators.required]
    });
    this.announcementPriceFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.announcementDescriptionFormGroup = this._formBuilder.group({
      firstCtrl: ['']
    });
  }


  create(): void {
    console.log(this.announcement);
    this.httpService.post('/announcements', this.announcement)
      .subscribe(data => {
        this.snackBarService.openSnackBar("You have been created successfully", "OK");
        this.router.navigateByUrl("/");
      });

  };


}
