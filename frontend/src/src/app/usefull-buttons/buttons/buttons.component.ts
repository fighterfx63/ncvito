import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {AdSearchComponent} from "../ad-search/ad-search.component";
import {MatDialog} from "@angular/material";
import {DialogDataModel} from "../ad-search/models/dialog-data-model";
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'ncvito-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.less']
})
export class ButtonsComponent {

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private searchService: SearchService) {

    router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.changeState(event.url);
    });

    this.dialogDataModel = new DialogDataModel();
  }

  private currentUrl: string;
  private arrow: boolean;
  private common: boolean;
  private search: boolean;
  private download: boolean;
  private searchShown: boolean;

  private dialogDataModel: DialogDataModel;

  private changeState(event: string) {
    this.currentUrl = event;
    if (event === '/announcements' || event === '/') {
      this.search = this.common = true;
      this.arrow = this.download = false;
    } else {
      if (event.search('/announcement') !== -1) {
        this.searchShown = false;
        this.download = this.common = this.arrow = true;
        this.search = false;
      } else {
        this.download = this.common = this.arrow = this.search = false;
      }
    }
  }

  private backClicked() {
    if (this.currentUrl !== '/announcements') {
      this.router.navigateByUrl('/announcements');
    } else {
      this.searchShown = false;
      this.arrow = false;
      this.search = true;
    }
  }

  private searchClicked() {
    this.searchShown = true;
    this.openDialog();
  }

  // TODO: add component for extracting page
  private downloadClicked() {
  }

  private openDialog(): void {
    const dialogRef = this.dialog.open(AdSearchComponent, {
      maxWidth: '550px',
      height: 'auto',
      data: this.dialogDataModel
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogDataModel = result;
        this.searchService.setUrl(this.dialogDataModel.filterURL);

        this.searchService.beginSearch();
      }

    });

  }

}
