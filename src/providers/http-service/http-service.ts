import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {HttpResult} from "./http-result";
import {CommonServiceProvider} from "../common-service/common-service";
import 'rxjs/add/operator/map';
import {AppConfig} from "../../util/AppConfig";

@Injectable()
export class HttpServiceProvider {

  constructor(public http: Http, public commonServiceProvider: CommonServiceProvider) {
  }

  /**
   * <p>方法描述: http 请求错误拦截器</p>
   * <p>创建人:qianming yang</p>
   * <p>创建时间:2017-6-20</p>
   * <p>修改人: </p>
   * <p>修改时间: </p>
   * <p>修改备注: </p>
   *
   * @param observable
   * @returns {Observable<HttpResult>}
   */
  intercept(observable: Observable<HttpResult>): Observable<HttpResult> {
    observable.subscribe(null, (err) => this.handleError(err.status));
    return observable;
  }

  /**
   * <p>方法描述: 错误消息处理</p>
   * <p>创建人:qianming yang</p>
   * <p>创建时间:2017-6-20</p>
   * <p>修改人: </p>
   * <p>修改时间: </p>
   * <p>修改备注: </p>
   *
   * @param status
   */
  handleError(status) {
    let message: string;
    switch (status) {
      case 0:
        message = "请求响应错误，请检查网络";
        break;
      case 404:
        message = '访问的地址有误';
        break;
      case 500:
        message = '服务器出错，请稍后再试';
        break;
      default:
        message = status + '-未知错误，请检查网络';
    }
    this.commonServiceProvider.infoShow(message);
  }

  /**
   * <p>方法描述: 重新格式化数据</p>
   * <p>创建人:qianming yang</p>
   * <p>创建时间:2017-6-20</p>
   * <p>修改人: </p>
   * <p>修改时间: </p>
   * <p>修改备注: </p>
   * @param res
   * @returns {HttpResult}
   */
  handleMap(res: any) {
    let _res = res.json();
    let _httpResult = new HttpResult();
    _httpResult.status = _res['status'];
    _httpResult.msg = _res['msg'];
    _httpResult.data = typeof _res['data'] == 'undefined' ? null : _res['data'];
    return _httpResult;
  }

  /**
   * <p>方法描述: 以post方式提交所有请求</p>
   * <p>创建人:qianming yang</p>
   * <p>创建时间:2017-6-20</p>
   * <p>修改人: </p>
   * <p>修改时间: </p>
   * <p>修改备注: </p>
   *
   * @param endpoint 请求地址
   * @param body 参数
   * @param options header设置
   * @returns {Observable<HttpResult>}
   */
  post(endpoint: string, body: any, options?: RequestOptions): Observable<HttpResult> {
    return this.intercept(this.http.post(AppConfig.getHttpUrl()+ '/' + endpoint, body, options).map(res => this.handleMap(res)).share());
  }
}
