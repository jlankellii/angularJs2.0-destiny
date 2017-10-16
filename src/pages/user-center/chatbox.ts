/**
 * 聊天面板
 * Created by qianming yang on 2017/8/9.
 */
import {Http} from "@angular/http";
import {Component, NgZone, ViewChild} from "@angular/core";
import {Storage} from '@ionic/storage';
import {ChatMessage} from '../../models/chat-message';
import {NavParams} from "ionic-angular";
import {SocketServiceProvider} from "../../providers/socket-service/socket-service";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {CodeEnum} from "../../util/codeEnum";
import {CommonServiceProvider} from "../../providers/common-service/common-service";

@Component({
  selector: 'page-chatbox',
  templateUrl: 'chatbox.html'
})

export class ChatBoxPage {
  @ViewChild('chat') chat: any;
  messages: any;
  chatBox: string;
  userNick: string;
  userId: string;
  userHead: string;
  myId: string;
  inRoom: boolean;//用于控制在当前聊天室的scrollTo，否则会报错

  constructor(private http: Http,
              private socket: SocketServiceProvider,
              private zone: NgZone,
              private storage: Storage,
              private commonServiceProvider: CommonServiceProvider,
              public userService: UserServiceProvider,
              public navParams: NavParams) {
    this.userHead = this.navParams.get('head');//对方的头像
    this.userNick = this.navParams.get('nick');//对方的昵称
    this.userId = this.navParams.get('toId');//对方的userid
    this.myId = this.navParams.get('formId');
    this.messages = [];
    this.zone = new NgZone({enableLongStackTrace: true});
    this.chatBox = "";
    this.socket.socketService.subscribe(event => {
      if (event.category === 'getMessage') {
        console.log("from:" + event.data.from + "/ to:" + event.data.to + " /msg:" + event.data.message);
        this.zone.run(() => {
          this.messages.push(event.data);
          console.log("inRoom:" + this.inRoom);
          if (this.inRoom) {
            this.chat.scrollTo(0, 99999, 0);
          }
        });
      }
    });

  }

  ionViewWillEnter() {
    console.log("进入聊天室")
    this.inRoom = true;
    this.userService.queryOfflineMessage(this.myId).subscribe(res => {
      if (res.isTrue(CodeEnum.APP_SUCCESS)) {
        //debugger
        if (res.data != null) {
          this.messages = res.data;
          this.userService.deleteOfflineMessage(this.myId).subscribe(dres => {
            if (!dres.isTrue(CodeEnum.APP_SUCCESS)) {
              this.commonServiceProvider.infoShow(dres.msg);
            }
          });
        }
      } else {
        this.commonServiceProvider.infoShow(res.msg);
      }
    });
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    console.log("离开聊天室")
    this.inRoom = false;
  }

  formatMessage(msg: string) {
    if (msg) {
      let chatMessage: ChatMessage = {
        to: this.userId,
        from: this.myId,
        message: msg,
      };
      return chatMessage;
    }
    return null;
  }

  send(message) {
    let newMsg = this.formatMessage(message);
    if (newMsg) {
      this.messages.push(newMsg);
      this.socket.sendMessage(newMsg);
    }
    this.chatBox = '';
  }
}
