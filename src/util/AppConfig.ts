/**
 * 配置
 * Created by qianming yang on 2017/7/30.
 */
export class AppConfig {
  //获取用户存储key静态方法
  public static getUserStorageKey() {
    return "minggetu_user";
  }

  //获取用户存储对象静态方法
  public static getUserStorageObj(phone: String, data: any) {
    return {
      phone: phone,
      _id: data['_id'],
      nick:data['nick']
    };
  }

  //服务器socket
  public static getSocketUrl() {
  //  return "http://192.168.1.9:80";
    return "http://www.minggetu.com"
  }

  //服务器http地址
  public static getHttpUrl() {
  //  return "http://192.168.1.9:80/mobile";
    return "http://www.minggetu.com/mobile"
  }

}
