/**
 * Created by qianming yang on 2017/6/17.
 */
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {MyInfoPage} from "./myInfo";
import {MyMessagePage} from "./myMessage";
import {AppConfig} from "../../util/AppConfig";
import {Storage} from '@ionic/storage';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {CommonServiceProvider} from "../../providers/common-service/common-service";
import {CodeEnum} from "../../util/codeEnum";
import {WelcomePage} from "../welcome/welcome";


/**
 *  我的模块
 */
@Component({
  selector: 'page-my',
  templateUrl: 'my.html'
})
export class MyPage {

  page: string = 'main';
  pageTitleKey: string = 'MY_TITLE';
  pageTitle: string;

  user = {
    nick: String,
    phone: String
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public translate: TranslateService,
              private storage: Storage,
              private userService: UserServiceProvider,
              private commonServiceProvider: CommonServiceProvider) {
  }

  ionViewWillEnter() {

    this.page = this.navParams.get('page') || this.page;
    this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;

    this.translate.get(this.pageTitleKey).subscribe((res) => {
      this.pageTitle = res;
    });
    this.storage.get(AppConfig.getUserStorageKey()).then((val) => {
      if (val && val['nick'] != null) {
        this.user.nick = val['nick'];
        this.user.phone = val['phone'];
      }
    });
  }

  /**
   * 展示用户信息
   */
  showDetail() {
    console.log("detail");
    this.navCtrl.push(MyInfoPage);
  }

  /**
   * 展示用户信息
   */
  showMyMessage() {
    console.log("message");
    this.navCtrl.push(MyMessagePage);
  }

  /**
   * 退出登录，会清空localstrage he
   */
  loginOut() {
    let _key = AppConfig.getUserStorageKey();
    this.storage.get(_key).then((val) => {
      if (val && val['_id'] != null) {
        this.storage.remove(_key).then(() => {
          this.userService.loginOut(val['_id']).subscribe(res => {
            if (res.isTrue(CodeEnum.APP_SUCCESS)){
              this.navCtrl.push(WelcomePage);
             /* this.navCtrl.popToRoot().then(() => {
                console.log("to root")
              });*/
            }
          });
        });
      }
    });
  }
}
