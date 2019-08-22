import {Component, OnInit} from '@angular/core';
import {Apartment} from "../models/apartment.model";
import {Announcement} from "../models/announcement.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {ActivatedRoute, Router} from "@angular/router";
import {SnackbarService} from "../services/snackbar.service";
import {HttpService} from "../services/http.service";

@Component({
  selector: 'ncvito-announcement-stepper',
  templateUrl: './announcement-stepper.component.html',
  styleUrls: ['./announcement-stepper.component.less']


})
export class AnnouncementStepperComponent implements OnInit {
  editAnnouncement : Announcement;
  apartment: Apartment = new Apartment('', undefined, undefined, undefined);
  announcement: Announcement = new Announcement(this.apartment, false, '', undefined, new Date());
  apartmentInfoFormGroup: FormGroup;
  announcementTypeFormGroup: FormGroup;
  announcementPriceFormGroup: FormGroup;
  announcementDescriptionFormGroup: FormGroup;


  constructor(private _formBuilder: FormBuilder, private httpService: HttpService, private router: Router, private snackBarService: SnackbarService, private  activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.editAnnouncement = this.router.getCurrentNavigation().extras.state.event;
        this.announcement=this.editAnnouncement;
      }
    });
  }

  ngOnInit() {

    this.apartmentInfoFormGroup = this._formBuilder.group({
      addressCtrl: ['', Validators.required],
      floorCtrl: ['', [Validators.required, Validators.min(1), , Validators.nullValidator]],
      roomCountCtrl: ['', [Validators.required, Validators.min(1), , Validators.nullValidator]],
      squareCtrl: ['', [Validators.required, Validators.min(1), , Validators.nullValidator]],
    });
    this.announcementTypeFormGroup = this._formBuilder.group({
      saleCtrl: [false, Validators.required]
    });
    this.announcementPriceFormGroup = this._formBuilder.group({
      priceCtrl: ['', Validators.required]
    });
    this.announcementDescriptionFormGroup = this._formBuilder.group({
      descriptionCtrl: ['']
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

  edit(): void {
    console.log(this.announcement);
    console.log(this.editAnnouncement);
    console.log(this.announcement.id);
    console.log(this.editAnnouncement.id);


    this.httpService.updateAnnoucements(this.editAnnouncement.id,this.announcement)
      .subscribe(data => {
        this.snackBarService.openSnackBar("Announcement edit  successfully", "OK");
        this.router.navigateByUrl("/");
      });
  }

}

