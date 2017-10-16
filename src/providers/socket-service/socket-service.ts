import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppConfig} from "../../util/AppConfig";
import {Observable} from "rxjs/Observable";
import {ChatMessage} from "../../models/chat-message";
import {Platform} from "ionic-angular";
import {Storage} from '@ionic/storage';
import * as io from 'socket.io-client';
import {UserServiceProvider} from "../user-service/user-service";


/*
 Generated class for the SocketServiceProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class SocketServiceProvider {
  socket: io;
  socketObserver: any;
  socketService: any;
  socketId: string;

  constructor(public http: Http,
              private platform: Platform,
              private storage: Storage,
              private userService: UserServiceProvider) {
    this.platform.ready().then(() => {
      //实例化socket对象
      this.socket = io(AppConfig.getSocketUrl(), {
        path: '/test_socket'
      });

      //创建连接，设置上线
      this.socket['on']('connect', () => {
        this.userOnLine(this.socket['id']);
        //创建执行对象
        this.socketService = Observable.create(observer => {
          this.socketObserver = observer;//当前observer跟外界产生关联
        });

        //用于初始化，若是第一次进入应用，有其它用户对该用户发送信息
        this.socketService.subscribe(event => {
          if (event.category === 'getMessage') {
            console.log("用户还从未进入聊天室");
          }
        });

      });

      //获取消息事件，并做了Observer对象处理，使用socketObserver传递
      this.socket['on']('getMessage', (res) => {
        this.socketObserver.next({category: 'getMessage', data: res});
      });

      //链接断开，设置下线
      this.socket['on']('disconnect', () => {
        this.userOnLine("");
      });
    });
  }

  /**
   * 获取socketId供其他业务模块使用
   * @returns {string}
   */
  getSocketId() {
    return this.socketId;
  }

  /**
   * 用户在线控制,规则是通过发送socketId至服务器存储，为“”则说明用户离线，否则就是在线
   * @param socketId
   */
  userOnLine(socketId: string) {
    this.socketId = socketId;
    this.storage.get(AppConfig.getUserStorageKey()).then((res) => {
      if (res && res['_id'] != null) {
        this.userService.onLine(res['_id'], socketId);
      }
    });
  }

  sendMessage(data: ChatMessage) {
    console.log('in sendMessage and socket id is: ', this.socketId);
    this.socket['emit']('sendMessage', data);
    //this.socketObserver.next({ category: 'sendMessage', message: message });
  }
}
