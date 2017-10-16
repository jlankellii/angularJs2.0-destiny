/**
 * 我的消息
 * Created by qianming yang on 2017/9/10.
 */
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';

import {TranslateService} from '@ngx-translate/core';
/*import {ChatBoxPage} from "./chatbox";*/
import {AppConfig} from "../../util/AppConfig";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {ChatBoxPage} from "./chatbox";
import {CodeEnum} from "../../util/codeEnum";
import {CommonServiceProvider} from "../../providers/common-service/common-service";

@Component({
  selector: 'page-myMessage',
  templateUrl: 'myMessage.html'
})
export class MyMessagePage {
  page: string = 'main';


  users: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public translate: TranslateService,
              private storage: Storage,
              private commonServiceProvider: CommonServiceProvider,
              private  userService: UserServiceProvider) {
    this.storage.get(AppConfig.getUserStorageKey()).then((val) => {
      if (val && val['_id'] != null) {
        this.userService.queryUserFollow(val['_id']).subscribe(res => {
          if (res.isTrue(CodeEnum.APP_SUCCESS)){
            this.users = res['data'];
          }else{
            this.commonServiceProvider.infoShow(res.msg);
          }
        });
      }
    });
  }


  ionViewWillEnter() {
   this.page = this.navParams.get('page') || this.page;
   /* this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;

    this.translate.get(this.pageTitleKey).subscribe((res) => {
      this.pageTitle = res;
    })*/
  }

  goChat(user: any) {
    this.storage.get(AppConfig.getUserStorageKey()).then((val) => {
      let chatParam = {
        toId: user['followId'],
        formId: val['_id'],
        nick: user['nick'],
        head: user['head'],
      }
      this.navCtrl.push(ChatBoxPage, chatParam);
    });
  }

}
