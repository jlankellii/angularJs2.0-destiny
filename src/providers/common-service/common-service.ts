import {Injectable} from '@angular/core';
import {ToastController} from "ionic-angular";

@Injectable()
export class CommonServiceProvider {

  constructor(public toastCtrl: ToastController) {
  }

  /**
   * <p>方法描述: 统一消息提示入口</p>
   * <p>创建人:qianming yang</p>
   * <p>创建时间:2017-6-20</p>
   * <p>修改人: </p>
   * <p>修改时间: </p>
   * <p>修改备注: </p>
   *
   * @param msg  显示的消息
   */
  infoShow(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

}
