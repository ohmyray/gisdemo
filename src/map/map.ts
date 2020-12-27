import {
  MapboxOptions,
  eventList,
  AnyLayer,
  AnySourceData,
  MapboxGeoJSONFeature,
  FilterOptions,
  EaseToOptions,
  EventData,
} from './interface/MapboxOptions'
import {
  /* webpackPrefetch: true */ AnySourceImpl,
  IControl,
  Map,
  PointLike,
} from 'mapbox-gl'
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
  init(options?: MapboxOptions): this {
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
   * 添加地图控件
   * @param control
   * @param position
   */
  addControl(
    control: IControl,
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  ): this {
    this._pmap.addControl(control, position)
    return this
  }

  /**
   * 将图像添加到样式
   * @param id
   * @param image
   * @param options
   */
  addImage(
    id: string,
    image:
      | HTMLImageElement
      | ImageBitmap
      | ImageData
      | { width: number; height: number; data: Uint8Array | Uint8ClampedArray },
    options: any
  ): this {
    this._pmap.addImage(id, image, options)
    return this
  }

  /**
   * 将Mapbox样式图层添加到地图样式
   * @param layer
   * @param beforeId
   */
  addLayer(layer: AnyLayer, beforeId?: string): this {
    this._pmap.addLayer(layer, beforeId)
    return this
  }

  /**
   * 向地图样式添加源
   * @param id
   * @param source
   */
  addSource(id: string, source: AnySourceData): this {
    this._pmap.addSource(id, source)
    return this
  }

  /**
   * 返回具有地图样式中指定ID的源
   * @param sourceId
   */
  getSource(sourceId: string): AnySourceImpl {
    return this._pmap.getSource(sourceId)
  }

  /**
   * 返回地图的<canvas>元素
   */
  getCanvas(): HTMLCanvasElement {
    return this._pmap.getCanvas()
  }

  easeTo(options: EaseToOptions, eventData?: EventData): this {
    this._pmap.easeTo(options, eventData)
    return this
  }

  /**
   * 返回表示满足查询参数的可见要素的GeoJSON Feature对象数组
   * @param pointOrBox
   * @param options
   */
  queryRenderedFeatures(
    pointOrBox?: PointLike | [PointLike, PointLike],
    options?: { layers?: string[]; filter?: any[] } & FilterOptions
  ): MapboxGeoJSONFeature[] {
    return this._pmap.queryRenderedFeatures(pointOrBox, options)
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
