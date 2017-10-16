/**
 * Created by qianming yang on 2017/6/20.
 * http 跨域访问
 */
import {Injectable} from '@angular/core';
import {Jsonp} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpApi {
  private url: string = 'http://192.168.1.9:3000/mobile';

  constructor(private jsonp: Jsonp) {
  }

  // jsonp
  get(endpoint: string, params: any) {
    /*let header = new Headers();
     header.append('Content-Type', 'application/json');
     let body = JSON.stringify(params);*/
    // return this.jsonp.get(this.url + '/' + endpoint, body).map(result => result.json());
   /* let p = new URLSearchParams();
    if (params) {
      for (let k in params) {
        p.set(k, params[k]);
      }
    }
    p.set("callback", "JSONP_CALLBACK");
    console.log(p.get("callback"));
    debugger;*/
    params.callback = "JSONP_CALLBACK";
    return new Promise((resolve, reject) => {
      this.jsonp.get(this.url + '/' + endpoint, params).map(result => result.json()).subscribe(
        data => {
          resolve(data);
        }, err => {
          reject(err);
        }
      );

    });
  }
}
