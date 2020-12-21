import { MapboxOptions } from './interface/MapboxOptions'
import { Map } from 'mapbox-gl'
import { accessToken } from '@/common/configs'

class MapBox implements Map {
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
    if (!!options) this._mapDefault = options
    if (!!!this._mapDefault) console.error(`参数为${options}!`)
    this._mapDefault && (this._pmap = new Map(this._mapDefault))
    return this
  }
}

export { MapBox }
