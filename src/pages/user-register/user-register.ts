import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {TranslateService} from "@ngx-translate/core";
import {CommonServiceProvider} from "../../providers/common-service/common-service";
import {CodeEnum} from "../../util/codeEnum";


/**
 * Generated class for the UserRegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-register',
  templateUrl: 'user-register.html',
})
export class UserRegisterPage {

  account: { loginName: string, password: string } = {
    loginName: '',
    password: ''
  };
  //错误消息
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
              public commonServiceProvider: CommonServiceProvider,
              public translateService: TranslateService,
              public userService: UserServiceProvider) {
    //获取注册错误消息
    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

  /**
   * <p>方法描述: 注册</p>
   * <p>创建人:qianming yang</p>
   * <p>创建时间:2017-6-20</p>
   * <p>修改人: </p>
   * <p>修改时间: </p>
   * <p>修改备注: </p>
   */
  doRegister() {
    this.userService.register(this.account).subscribe(res => {
      this.commonServiceProvider.infoShow(res.msg);
      if(res.isTrue(CodeEnum.APP_REGISTER_SUCCESS)){

      }
    });
  }

}
