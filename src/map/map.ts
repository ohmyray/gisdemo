import { MapboxOptions } from './interface/MapboxOptions'
import {/* webpackPrefetch: true */ Map } from 'mapbox-gl'
import { accessToken } from '@/common/configs'

class MapBox {
  _pmap!: Map
  _mapDefault!: MapboxOptions
  constructor(options?: MapboxOptions) {
    options && (options.accessToken = accessToken)
    options && (this._pmap = new Map(options))
  }

  /**
   *
   * @param options
   */
  init(options?: MapboxOptions): MapBox {
    options && (options.accessToken = accessToken)
    if (!!options) this._mapDefault = options
    if (!!!this._mapDefault) console.error(`参数为${options}!`)
    this._mapDefault && (this._pmap = new Map(this._mapDefault))
    return this
  }
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
