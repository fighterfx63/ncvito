import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';


@Component({
  selector: 'ncvito-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.less']
})
export class ButtonsComponent {

  constructor(private router: Router) {
    router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.changeState(event.url);
    });
  }


  private currentUrl: string;
  private arrow: boolean;
  private common: boolean;
  private search: boolean;
  private download: boolean;
  private searchShown: boolean;

  private changeState(event: string) {
    this.currentUrl = event;
    if (event === '/announcements') {
      this.search = this.common = true;
      this.arrow = this.download = false;
    } else {
      if (event.search('/advertisemet') !== -1) {
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
    }
  }

  private searchClicked() {
    this.searchShown = true;
    this.arrow = true;
    this.search = false;
  }

  private downloadClicked() {
  }

}
