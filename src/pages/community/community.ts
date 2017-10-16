import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-community',
  templateUrl: 'community.html'
})
export class CommunityPage {

  currentItems: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) { }
}
