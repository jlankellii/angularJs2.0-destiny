/**
 * 设置http请求返回的数据格式
 * Created by qianming yang on 2017/6/24.
 */
export class HttpResult {
  status: number;
  msg: string;
  data:any;
  isTrue(codeEnum):any{
    if (typeof codeEnum === 'number') {
      if (this.status == codeEnum) {
        return true;
      }
    }
    return false;
  }
}
