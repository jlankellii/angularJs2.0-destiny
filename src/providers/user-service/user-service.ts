import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpServiceProvider} from "../http-service/http-service";

/*
 Generated class for the UserServiceProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class UserServiceProvider {

  constructor(private http: Http, private httpServiceProvider: HttpServiceProvider) {
    console.log('Hello UserServiceProvider Provider');
  }

  /**
   * <p>方法描述: 注册</p>
   * <p>创建人:qianming yang</p>
   * <p>修改人: </p>
   * <p>修改时间: </p>
   * <p>修改备注: </p>
   *
   * @param bicycleId
   */
  register(account: any) {
    return this.httpServiceProvider.post("user/register", account);
  }

  /**
   * <p>方法描述: 登录</p>
   * <p>创建人:qianming yang</p>
   * <p>修改人: </p>
   * <p>修改时间: </p>
   * <p>修改备注: </p>
   *
   * @param bicycleId
   */
  login(account: any) {
    return this.httpServiceProvider.post("user/login", account);
  }

  /**
   * 退出登录
   * @param uid
   * @returns {Observable<HttpResult>}
   */
  loginOut(uid: any) {
    let data = {
      _id: uid
    };
    return this.httpServiceProvider.post("user/loginOut", data);
  }

  /**
   *
   * @param uid  用户id
   * @param socketId socketId
   * @returns {Observable<HttpResult>}
   */
  onLine(uid: any, socketId: string) {
    let data = {
      _id: uid,
      socketId: socketId
    };
    return this.httpServiceProvider.post("user/onLine", data);
  }

  /**
   *查询我的朋友，相互关注的
   * @param uid 用户id
   */
  queryUsers(uid: any) {
    return this.httpServiceProvider.post("user/queryUsers", {_id: uid});
  }

  /**
   *查询我的朋友，相互关注的
   * @param uid 用户id
   */
  queryUserFollow(uid: any) {
    return this.httpServiceProvider.post("user/queryUserFollow", {_id: uid});
  }

  /**
   * 设置关注
   * @param myId，当前登录者id
   * @param followId，被关注者id
   * @returns {Observable<HttpResult>}
   */
  setFollow(myId: any, followId: any) {
    return this.httpServiceProvider.post("user/setFollow", {myId: myId, followId: followId});
  }

  /**
   *查询我用户离线消息
   * @param uid 用户id
   */
  queryOfflineMessage(uid: any) {
    return this.httpServiceProvider.post("user/queryOfflineMessage", {_id: uid});
  }

  /**
   *删除我用户离线消息
   * @param uid 用户id
   */
  deleteOfflineMessage(uid: string) {
    return this.httpServiceProvider.post("user/deleteOfflineMessage", {_id: uid});
  }
}
