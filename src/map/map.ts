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
  AnimationOptions,
  /* webpackPrefetch: true */ AnySourceImpl,
  CameraForBoundsOptions,
  CameraForBoundsResult,
  CameraOptions,
  FitBoundsOptions,
  FlyToOptions,
  IControl,
  LngLatBounds,
  LngLatBoundsLike,
  Map,
  PointLike,
} from 'mapbox-gl'
import { Config } from './configs'
import { Emitter } from '@/util/event-emitter'

import { ObtSytle } from './style'

class MapBox extends Emitter {
  // 地图引擎事件
  _pmap!: Map
  // 地图默认配置
  _mapDefault!: MapboxOptions
  // 引擎外部参数配置
  _config: Config = Config.instance
  _regulatorObt!: ObtSytle
  // 地图构造器
  constructor(options?: MapboxOptions) {
    super()
    this._regulatorObt = new ObtSytle()
    options && (options.accessToken = this._config.AccessToken)
    if (options?.style)
      options.style = this._regulatorObt.SerializableStyle(
        <string>options.style
      )
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
    if (options?.style)
      options.style = this._regulatorObt.SerializableStyle(
        <string>options.style
      )
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

  /**
   * 返回一个布尔值，指示是否已加载样式中所有源中的视口中的所有图块
   */
  areTitlesLoaded(): boolean {
    return this._pmap.areTilesLoaded()
  }

  /**
   * 如果地图能够适应提供的边界，则返回带有center，zoom和bearing的CameraOptions。如果地图无法容纳，则方法将发出警告并返回未定义。
   * @param bounds
   * @param options
   */
  cameraForBounds(
    bounds: LngLatBoundsLike,
    options?: CameraForBoundsOptions
  ): CameraForBoundsResult | undefined {
    return this._pmap.cameraForBounds(bounds, options)
  }

  /**
   * 更改中心，缩放，方位，俯仰和填充的任何组合，并在新旧值之间进行动画过渡。对于选项中未指定的任何详细信息，地图将保留其当前值。
   */
  easeTo(options: EaseToOptions, eventData?: EventData): this {
    this._pmap.easeTo(options, eventData)
    return this
  }

  /**
   * 平移和缩放地图，使其包含在指定地理范围内的可见区域。如果方位角不为零，则此功能还将地图的方位角重置为0。
   * @param bounds
   * @param options
   * @param eventData
   */
  fitBounds(
    bounds: LngLatBoundsLike,
    options?: FitBoundsOptions,
    eventData?: EventData
  ): this {
    this._pmap.fitBounds(bounds, options, eventData)
    return this
  }

  /**
   * 将地图旋转到指定方位后，平移，旋转和缩放地图以适合由点p0和p1制成的框。要在不旋转的情况下进行缩放，请传入当前地图方位。
   * @param p0
   * @param p1
   * @param bearing
   * @param options
   * @param eventData
   */
  fitScreenCoordinates(
    p0: PointLike,
    p1: PointLike,
    bearing: number,
    options?: AnimationOptions & CameraOptions,
    eventData?: EventData
  ): this {
    this._pmap.fitScreenCoordinates(p0, p1, bearing, options, eventData)
    return this
  }

  /**
   * 更改中心，缩放，方位角和俯仰角的任意组合，为沿引起飞行的曲线的过渡设置动画。动画无缝地结合了缩放和平移功能，即使在经过很长的距离后也可以帮助用户保持方位。
   * @param options
   * @param eventData
   */
  flyTo(options: FlyToOptions, eventData?: EventData): this {
    this._pmap.flyTo(options, eventData)
    return this
  }

  /**
   * 返回地图的当前方位。方位是指“罗盘”方向，即“向上”。例如，方位角为90°可使地图定向，以使东方朝上。
   */
  getBearing(): number {
    return this._pmap.getBearing()
  }

  /**
   * 返回地图的地理范围。当方位角或螺距不为零时，可见区域不是轴对齐的矩形，结果是包围可见区域的最小边界。
   */
  getBounds(): LngLatBounds {
    return this._pmap.getBounds()
  }

  /**
   * 返回地图所限制的最大地理范围；如果未设置，则返回null。
   */
  getMaxBounds(): LngLatBounds | null {
    return this._pmap.getMaxBounds()
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
