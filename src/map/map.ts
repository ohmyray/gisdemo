import { MapboxOptions, eventList } from './interface/MapboxOptions'
import { /* webpackPrefetch: true */ Map } from 'mapbox-gl'
import { accessToken } from '@/common/configs'
import { Emitter } from '@/util/event-emitter'

class MapBox extends Emitter {
  _pmap!: Map
  _mapDefault!: MapboxOptions
  constructor(options?: MapboxOptions) {
    super()
    options && (options.accessToken = accessToken)
    options && (this._pmap = new Map(options))
  }

  /**
   * 初始化地图方法
   * @param options
   */
  init(options?: MapboxOptions): MapBox {
    options && (options.accessToken = accessToken)
    if (!!options) this._mapDefault = options
    if (!!!this._mapDefault) console.error(`参数为${options}!`)
    this._mapDefault && (this._pmap = new Map(this._mapDefault))
    // this.registerEvent()
    // this._pmap.on('load', () => {
    //   console.log('load 事件注册')
    // })
    return this
  }

  // getVersion() {
  //   return this._pmap['version']
  // }

  on(eventName: string, layerId: string | Function, callback?: Function) {
    if (typeof layerId === 'function')
      this._pmap.on(<any>eventName, <any>layerId)
    else this._pmap.on(<any>eventName, layerId, <any>callback)
  }

  off(eventName: string, layerId: string | Function, callback?: Function) {
    if (typeof layerId === 'function')
      this._pmap.off(<any>eventName, <any>layerId)
    else this._pmap.off(<any>eventName, layerId, <any>callback)
  }

  once(eventName: string, layerId: string | Function, callback: Function) {
    if (typeof layerId === 'function')
      this._pmap.once(<any>eventName, <any>layerId)
    else this._pmap.once(<any>eventName, layerId, <any>callback)
  }

  // protected registerEvent() {
  //   if (this._pmap) {
  //     for (let i = 0; i < eventList.length; i++) {
  //       this._pmap.on(eventList[i], () => {
  //         Emitter.$register(
  //           eventList[i],
  //           () => {
  //             console.log(eventList[i] + '.loaded')
  //           },
  //           eventList[i] + '.loaded'
  //         )
  //       })
  //     }
  //   }
  // }

  // protected on(eventName: string, callback: Function) {
  //   if (this._pmap) {
  //     for (let i = 0; i < eventList.length; i++) {
  //       eventList[i] === eventName &&
  //         Emitter.$fire(
  //           eventList[i],
  //           () => {
  //             console.log(eventList[i] + '.loaded')
  //           },
  //           eventList[i] + '.loaded'
  //         )
  //     }
  //   }
  // }
}

export { MapBox }

// import { MapboxOptions } from './interface/MapboxOptions'
// import { Map } from 'mapbox-gl'
// import { accessToken } from '@/common/configs'

// class MapBox {
//   _mapengine!: Map
//   _options!: MapboxOptions
//   constructor(options?: MapboxOptions) {
//     this._options.accessToken = accessToken
//     options && (this._options = { ...this._options, ...options })
//   }

//   /**
//    *
//    * @param options
//    */
//   public init(options?: MapboxOptions): MapBox {
//     console.log(this._options, options)
//     if (!!options) this._options = options
//     if (!!!this._options) console.error(`参数为${options}!`)
//     options && (this._options = { ...this._options, ...options })
//     console.log(this._options)

//     // this._options && (this._mapengine = new Map(this._options))
//     // this._mapengine.on('load', function () {
//     //   console.log('A load event occurred.')
//     // })
//     return this
//   }
// }

// export { MapBox }
