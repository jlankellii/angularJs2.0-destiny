import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {User} from '../../providers/user';

import {Storage} from '@ionic/storage';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {CommonServiceProvider} from "../../providers/common-service/common-service";
import {CodeEnum} from "../../util/codeEnum";

import {AppConfig} from "../../util/AppConfig";
import {SocketServiceProvider} from "../../providers/socket-service/socket-service";


/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
 */
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
  segmentsArray = ['signup','login'];
  segmentModel: string = this.segmentsArray[0];

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
      }
    });
  }


  // login() {
  //   this.navCtrl.push(LoginPage);
  // }
  //
  // signup() {
  //   //this.navCtrl.push(SignupPage);
  //   this.navCtrl.push(UserRegisterPage);
  // }
}
