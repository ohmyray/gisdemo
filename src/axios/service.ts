import axios from './request'

/**
 * 定义Axios请求服务
 */
class Axios {
  // 超时时间-单位毫秒
  private static axiosTimeOut = 30000
  // 重复次数
  // private static axiosRetry = 2;
  // 重复时隔
  // private static axiosRetryDelay = 1000;

  // 注册服务
  static init(): Axios {
    // map.Http.get = this.get
    // map.Http.post = this.post
    // map.Http.put = this.put
    // map.Http.delete = this.delete

    //在main.js设置全局的请求次数，请求的间隙
    axios.defaults.timeout = this.axiosTimeOut
    return this
  }

  // get远程方法
  static get(url: string, config?: any): Axios {
    return axios.get(url, config ? config : {})
  }

  // post远程方法
  static post(url: string, data: any): Axios {
    return axios.post(url, data)
  }

  // put远程方法
  static put(url: string, data: any): Axios {
    return axios.put(url, data)
  }

  // delete远程方法
  static delete(url: string): Axios {
    return axios.delete(url)
  }
}

export { Axios }
