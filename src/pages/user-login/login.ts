import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Storage} from '@ionic/storage';

import {MainPage} from '../../pages/pages';

import {User} from '../../providers/user';

import {UserServiceProvider} from "../../providers/user-service/user-service";
import {CommonServiceProvider} from "../../providers/common-service/common-service";
import {CodeEnum} from "../../util/codeEnum";

import {AppConfig} from "../../util/AppConfig";
import {SocketServiceProvider} from "../../providers/socket-service/socket-service";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  account: { loginName: string, password: string, socketId: string } = {
    loginName: '13568999967',
    password: '000000',
    socketId: this.socket.getSocketId()
  };

  constructor(public navCtrl: NavController,
              public user: User,
              private storage: Storage,
              private commonServiceProvider: CommonServiceProvider,
              public userService: UserServiceProvider,
              private socket: SocketServiceProvider) {
  }

  doLogin() {
    this.userService.login(this.account).subscribe(res => {
      this.commonServiceProvider.infoShow(res.msg);
      if (res.isTrue(CodeEnum.APP_LOGIN_SUCCESS)) {
        let user = AppConfig.getUserStorageObj(this.account.loginName, res.data);
        this.storage.set(AppConfig.getUserStorageKey(), user);
        this.navCtrl.push(MainPage);
      }
    });
  }
}
