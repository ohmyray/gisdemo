// function validateK(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//     // console.log('changeName befor')
//     // console.log(`target:${JSON.stringify(target)}, propertyKey:${propertyKey}, descriptor: ${descriptor.value}`);
//     let saveRun = descriptor.value; // 保存原来函数
//     descriptor.value = function () {
//         // console.log('changeName 装饰器重写');
//     }
//     descriptor.value(); // 执行重写函数
//     saveRun(); // 执行原保存changeName方法
//     // console.log('changeName after');
// }

/**
 * Mapbox配置类
 */
class Config {
  constructor() {}
  public static instance: Config = new Config()
  private _accessToken: string =
    'pk.eyJ1Ijoib2hteXJheSIsImEiOiJja2FvMHlrNnUxd3FlMnNtcXQ2YzR6cDNhIn0.VOodHc8C2T6ldql4mnsSeg'
  private _baseApiUrl: string = 'https://api.mapbox.com'
  private _maxParallelImageRequests: number = 10

  get AccessToken(): string {
    return this._accessToken
  }

  set AccessToken(accessToken: string) {
    this._accessToken = accessToken
  }

  get BaseApiUrl(): string {
    return this._baseApiUrl
  }

  set BaseApiUrl(baseApiUrl: string) {
    this._baseApiUrl = baseApiUrl
  }

  get MaxParallelImageRequests(): number {
    return this._maxParallelImageRequests
  }

  set MaxParallelImageRequests(maxParallelImageRequests: number) {
    this._maxParallelImageRequests = maxParallelImageRequests
  }
}

export { Config }
