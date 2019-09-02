import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ncvito-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit{

  show: boolean = true;
  showFav: boolean = false;
  showApp(){
    if (!this.show){
      this.show = !this.show;
      this.showFav = !this.showFav;
    }
  }
  showFavorites(){
    if (!this.showFav){
      this.showFav = !this.showFav;
      this.show = !this.show;
    }

  }
  ngOnInit(){
  }
}
