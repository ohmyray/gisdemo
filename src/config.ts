import { MapBox } from './map'

import { $fetch } from './axios'

// let StylePrefix = {
//   MAPBOX: 'mapbox://',
//   WEBGIS: 'webgis://',
//   MINEMAP: 'minemap://',
// }
// window['mapSupport'] = <any>StylePrefix

const WebGIS = {
  Map: MapBox,
  $fetch,
}

export { WebGIS }
// export { MapBox }
