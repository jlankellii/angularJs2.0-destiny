/**
 * Created by thinkpad on 2017/6/19.
 */
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'page-myInfo',
  templateUrl: 'myInfo.html'
})
export class MyInfoPage{
  page: string = 'main';
  pageTitleKey: string = 'MYINFO_TITLE';
  pageTitle: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public translate: TranslateService) {
  }

  ionViewWillEnter() {
    this.page = this.navParams.get('page') || this.page;
    this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;

    this.translate.get(this.pageTitleKey).subscribe((res) => {
      this.pageTitle = res;
    })
  }

}
