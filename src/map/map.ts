import { MapboxOptions, eventList } from './interface/MapboxOptions'
import { /* webpackPrefetch: true */ Map } from 'mapbox-gl'
import { Config } from './configs'
import { Emitter } from '@/util/event-emitter'

class MapBox extends Emitter {
  // 地图引擎事件
  _pmap!: Map
  // 地图默认配置
  _mapDefault!: MapboxOptions
  // 引擎外部参数配置
  _config: Config = Config.instance
  // 地图构造器
  constructor(options?: MapboxOptions) {
    super()
    options && (options.accessToken = this._config.AccessToken)
    options && (this._pmap = new Map(options))
  }

  /**
   * 初始化地图方法
   * @param options 
   */
  init(options?: MapboxOptions): MapBox {
    options && (options.accessToken = this._config.AccessToken)
    if (!!options) this._mapDefault = options
    if (!!!this._mapDefault) console.error(`参数为${options}!`)
    this._mapDefault && (this._pmap = new Map(this._mapDefault))
    // this.registerEvent()
    // this._pmap.on('load', () => {
    //   console.log('load 事件注册')
    // })
    return this
  }

  /**
   * 监听事件
   * @param eventName
   * @param layerId
   * @param callback
   */
  on(eventName: string, layerId: string | Function, callback?: Function) {
    if (typeof layerId === 'function')
      this._pmap.on(<any>eventName, <any>layerId)
    else this._pmap.on(<any>eventName, layerId, <any>callback)
  }

  /**
   * 关闭事件
   * @param eventName
   * @param layerId
   * @param callback
   */
  off(eventName: string, layerId: string | Function, callback?: Function) {
    if (typeof layerId === 'function')
      this._pmap.off(<any>eventName, <any>layerId)
    else this._pmap.off(<any>eventName, layerId, <any>callback)
  }

  /**
   * 一次事件
   * @param eventName
   * @param layerId
   * @param callback
   */
  once(eventName: string, layerId: string | Function, callback: Function) {
    if (typeof layerId === 'function')
      this._pmap.once(<any>eventName, <any>layerId)
    else this._pmap.once(<any>eventName, layerId, <any>callback)
  }
}

export { MapBox }
