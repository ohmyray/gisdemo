//axios 默认设置

// 默认利用axios的cancelToken进行防重复提交。
// 如需允许多个提交同时发出。则需要在请求配置config中增加 neverCancel 属性，并设置为true
import axios from 'axios'
/* 防止重复提交，利用axios的cancelToken */
let pending: any[] = [] // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const CancelToken: any = axios.CancelToken

// 设置请求响应时间
axios.defaults.timeout = 5000
// 设置请求头
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.patch['Content-Type'] =
  'application/x-www-form-urlencoded'
//设置是否是跨域请求
//axios.defaults.withCredentials = true;//default

const removePending: any = (config: any, f: any) => {
  // 获取请求的url
  const flagUrl = config.url
  // 判断该请求是否在请求队列中
  if (pending.indexOf(flagUrl) !== -1) {
    // 如果在请求中，并存在f,f即axios提供的取消函数
    if (f) {
      f('取消重复请求') // 执行取消操作
    } else {
      pending.splice(pending.indexOf(flagUrl), 1) // 把这条记录从数组中移除
    }
  } else {
    // 如果不存在在请求队列中，加入队列
    if (f) {
      pending.push(flagUrl)
    }
  }
}

/* request拦截器 */
axios.interceptors.request.use(
  (config: any) => {
    // neverCancel 配置项，允许多个请求
    if (!config.neverCancel) {
      // 生成cancelToken
      config.cancelToken = new CancelToken((c: any) => {
        removePending(config, c)
      })
    }
    // 在这里可以统一修改请求头，例如 加入 用户 token 等操作
    //   if (store.getters.sessionId) {
    //     config.headers['X-SessionId'] = getSessionId(); // 让每个请求携带token--['X-Token']为自定义key
    //   }
    return config
  },
  (error: any) => {
    Promise.reject(error)
  }
)

/* respone拦截器 */
axios.interceptors.response.use(
  (response: any) => {
    // 移除队列中的该请求，注意这时候没有传第二个参数f
    removePending(response.config)
    // 返回对象
    return response.data
  },
  (error: any) => {
    // 异常处理
    console.log(error)
    pending = []
    return Promise.reject(error)
  }
)

export default axios
