import { MapBox } from './map'

import { $fetch } from './axios'

// let StylePrefix = {
//   MAPBOX: 'mapbox://',
//   WEBGIS: 'webgis://',
//   MINEMAP: 'minemap://',
// }
// window['mapSupport'] = <any>StylePrefix
let projectConfig = window['projectConfig']
projectConfig['hostURL'] = window.origin
projectConfig['asstesFolderName'] = 'asstes'
// window['projectConfig']['hostURL'] = window.origin

const WebGIS = {
  Map: MapBox,
  $fetch,
}

export { WebGIS }
// export { MapBox }
