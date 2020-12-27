import {
  FitBoundsOptions,
  LngLatBoundsLike,
  LngLatLike,
  TransformRequestFunction,
} from 'mapbox-gl'
import {
  BackgroundLayer,
  CircleLayer,
  FillExtrusionLayer,
  FillLayer,
  HeatmapLayer,
  HillshadeLayer,
  LineLayer,
  RasterLayer,
  SymbolLayer,
  CustomLayerInterface,
} from 'mapbox-gl'
import {
  GeoJSONSourceRaw,
  VideoSourceRaw,
  ImageSourceRaw,
  CanvasSourceRaw,
  VectorSource,
  RasterSource,
  RasterDemSource,
} from 'mapbox-gl'

/**
 * 地图参数
 */
export interface MapboxOptions {
  /**
   * If true, the gl context will be created with MSA antialiasing, which can be useful for antialiasing custom layers.
   * This is false by default as a performance optimization.
   */
  antialias?: boolean

  /** If true, an attribution control will be added to the map. */
  attributionControl?: boolean

  bearing?: number

  /** Snap to north threshold in degrees. */
  bearingSnap?: number

  /** The initial bounds of the map. If bounds is specified, it overrides center and zoom constructor options. */
  bounds?: LngLatBoundsLike

  /** If true, enable the "box zoom" interaction (see BoxZoomHandler) */
  boxZoom?: boolean

  /** initial map center */
  center?: LngLatLike

  /**
   * The max number of pixels a user can shift the mouse pointer during a click for it to be
   * considered a valid click (as opposed to a mouse drag).
   *
   * @default 3
   */
  clickTolerance?: number

  /**
   * If `true`, Resource Timing API information will be collected for requests made by GeoJSON
   * and Vector Tile web workers (this information is normally inaccessible from the main
   * Javascript thread). Information will be returned in a `resourceTiming` property of
   * relevant `data` events.
   *
   * @default false
   */
  collectResourceTiming?: boolean

  /**
   * If `true`, symbols from multiple sources can collide with each other during collision
   * detection. If `false`, collision detection is run separately for the symbols in each source.
   *
   * @default true
   */
  crossSourceCollisions?: boolean

  /** ID of the container element */
  container: string | HTMLElement

  /** String or strings to show in an AttributionControl.
   * Only applicable if options.attributionControl is `true`. */
  customAttribution?: string | string[]

  /** If true, enable the "drag to pan" interaction (see DragPanHandler). */
  dragPan?: boolean

  /** If true, enable the "drag to rotate" interaction (see DragRotateHandler). */
  dragRotate?: boolean

  /** If true, enable the "double click to zoom" interaction (see DoubleClickZoomHandler). */
  doubleClickZoom?: boolean

  /** If `true`, the map's position (zoom, center latitude, center longitude, bearing, and pitch) will be synced with the hash fragment of the page's URL.
   * For example, `http://path/to/my/page.html#2.59/39.26/53.07/-24.1/60`.
   * An additional string may optionally be provided to indicate a parameter-styled hash,
   * e.g. http://path/to/my/page.html#map=2.59/39.26/53.07/-24.1/60&foo=bar, where foo
   * is a custom parameter and bar is an arbitrary hash distinct from the map hash.
   * */
  hash?: boolean | string

  /**
   * Controls the duration of the fade-in/fade-out animation for label collisions, in milliseconds.
   * This setting affects all symbol layers. This setting does not affect the duration of runtime
   * styling transitions or raster tile cross-fading.
   *
   * @default 300
   */
  fadeDuration?: number

  /** If true, map creation will fail if the implementation determines that the performance of the created WebGL context would be dramatically lower than expected. */
  failIfMajorPerformanceCaveat?: boolean

  /** A fitBounds options object to use only when setting the bounds option. */
  fitBoundsOptions?: FitBoundsOptions

  /** If false, no mouse, touch, or keyboard listeners are attached to the map, so it will not respond to input */
  interactive?: boolean

  /** If true, enable keyboard shortcuts (see KeyboardHandler). */
  keyboard?: boolean

  /** A patch to apply to the default localization table for UI strings, e.g. control tooltips.
   * The `locale` object maps namespaced UI string IDs to translated strings in the target language;
   * see `src/ui/default_locale.js` for an example with all supported string IDs.
   * The object may specify all UI strings (thereby adding support for a new translation) or
   * only a subset of strings (thereby patching the default translation table).
   */
  locale?: { [key: string]: string }

  /**
   * If specified, defines a CSS font-family for locally overriding generation of glyphs in the
   * 'CJK Unified Ideographs' and 'Hangul Syllables' ranges. In these ranges, font settings from
   * the map's style will be ignored, except for font-weight keywords (light/regular/medium/bold).
   * The purpose of this option is to avoid bandwidth-intensive glyph server requests.
   *
   * @default null
   */
  localIdeographFontFamily?: string

  /**
   * A string representing the position of the Mapbox wordmark on the map.
   *
   * @default "bottom-left"
   */
  logoPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

  /** If set, the map is constrained to the given bounds. */
  maxBounds?: LngLatBoundsLike

  /** Maximum pitch of the map. */
  maxPitch?: number

  /** Maximum zoom of the map. */
  maxZoom?: number

  /** Minimum pitch of the map. */
  minPitch?: number

  /** Minimum zoom of the map. */
  minZoom?: number

  /** If true, The maps canvas can be exported to a PNG using map.getCanvas().toDataURL();. This is false by default as a performance optimization. */
  preserveDrawingBuffer?: boolean

  /**
   * The initial pitch (tilt) of the map, measured in degrees away from the plane of the
   * screen (0-60).
   *
   * @default 0
   */
  pitch?: number

  /**
   * If `false`, the map's pitch (tilt) control with "drag to rotate" interaction will be disabled.
   *
   * @default true
   */
  pitchWithRotate?: boolean

  /**
   * If `false`, the map won't attempt to re-request tiles once they expire per their HTTP
   * `cacheControl`/`expires` headers.
   *
   * @default true
   */
  refreshExpiredTiles?: boolean

  /**
   * If `true`, multiple copies of the world will be rendered, when zoomed out.
   *
   * @default true
   */
  renderWorldCopies?: boolean

  /** If true, enable the "scroll to zoom" interaction */
  scrollZoom?: boolean

  /** stylesheet location */
  style?: mapboxgl.Style | string

  /** If  true, the map will automatically resize when the browser window resizes */
  trackResize?: boolean

  /**
   * A callback run before the Map makes a request for an external URL. The callback can be
   * used to modify the url, set headers, or set the credentials property for cross-origin requests.
   *
   * @default null
   */
  transformRequest?: TransformRequestFunction

  /** If true, enable the "pinch to rotate and zoom" interaction (see TouchZoomRotateHandler). */
  touchZoomRotate?: boolean

  /** If true, the "drag to pitch" interaction is enabled */
  touchPitch?: boolean

  /** Initial zoom level */
  zoom?: number

  /**
   * The maximum number of tiles stored in the tile cache for a given source. If omitted, the
   * cache will be dynamically sized based on the current viewport.
   *
   * @default null
   */
  maxTileCacheSize?: number

  /**
   * If specified, map will use this token instead of the one defined in mapboxgl.accessToken.
   *
   * @default null
   */
  accessToken?: string
}

/**
 * 地图控件
 */
export interface IControl {
  onAdd(map: any): HTMLElement
  onRemove(map: any): void
  getDefaultPosition?: () => string
}

/**
 * 地图事件池
 */
export const eventList = [
  'mousedown',
  'mouseup',
  'mouseover',
  'mouseout',
  'mousemove',
  'mouseenter',
  'mouseleave',
  'click',
  'dblclick',
  'contextmenu',
  'touchstart',
  'touchend',
  'touchcancel',
  'wheel',
  'resize',
  'remove',
  'touchmove',
  'movestart',
  'move',
  'moveend',
  'dragstart',
  'drag',
  'dragend',
  'zoomstart',
  'zoom',
  'zoomend',
  'rotatestart',
  'rotate',
  'rotateend',
  'pitchstart',
  'pitch',
  'pitchend',
  'boxzoomstart',
  'boxzoomend',
  'boxzoomcancel',
  'webglcontextlost',
  'webglcontextrestored',
  'load',
  'render',
  'idle',
  'error',
  'data',
  'styledata',
  'sourcedata',
  'dataloading',
  'styledataloading',
  'sourcedataloading',
  'styleimagemissing',
]

export type AnyLayer =
  | BackgroundLayer
  | CircleLayer
  | FillExtrusionLayer
  | FillLayer
  | HeatmapLayer
  | HillshadeLayer
  | LineLayer
  | RasterLayer
  | SymbolLayer
  | CustomLayerInterface

export type AnySourceData =
  | GeoJSONSourceRaw
  | VideoSourceRaw
  | ImageSourceRaw
  | CanvasSourceRaw
  | VectorSource
  | RasterSource
  | RasterDemSource

type Visibility = 'visible' | 'none'
export interface Layout {
  visibility?: Visibility
}
interface Layer {
  id: string
  type: string
  metadata?: any
  ref?: string
  source?: string | AnySourceData
  'source-layer'?: string
  minzoom?: number
  maxzoom?: number
  interactive?: boolean
  filter?: any[]
  layout?: Layout
  paint?: object
}

export type MapboxGeoJSONFeature = GeoJSON.Feature<GeoJSON.Geometry> & {
  layer: Layer
  source: string
  sourceLayer: string
  state: { [key: string]: any }
}

export type PointLike = [number, number]

export interface FilterOptions {
  /**
   *是否检查过滤器是否符合Mapbox GL样式规范。
   *禁用验证是一项性能优化，仅应使用
   *如果您之前已经验证过这些值，则将传递给该函数。
   */
  validate?: boolean | null
}

/**
 * AnimationOptions
 */
export interface AnimationOptions {
  /** Number in milliseconds */
  duration?: number
  /**
   * A function taking a time in the range 0..1 and returning a number where 0 is the initial
   * state and 1 is the final state.
   */
  easing?: (time: number) => number
  /** point, origin of movement relative to map center */
  offset?: PointLike
  /** When set to false, no animation happens */
  animate?: boolean

  /** If `true`, then the animation is considered essential and will not be affected by `prefers-reduced-motion`.
   * Otherwise, the transition will happen instantly if the user has enabled the `reduced motion` accesibility feature in their operating system.
   */
  essential?: boolean
}

/**
 * CameraOptions
 */
export interface CameraOptions {
  /** Map center */
  center?: LngLatLike
  /** Map zoom level */
  zoom?: number
  /** Map rotation bearing in degrees counter-clockwise from north */
  bearing?: number
  /** Map angle in degrees at which the camera is looking at the ground */
  pitch?: number
  /** If zooming, the zoom center (defaults to map center) */
  around?: LngLatLike
}

/**
 * EaseToOptions
 */
export interface EaseToOptions extends AnimationOptions, CameraOptions {
  delayEndEvents?: number
}

export type EventData = { [key: string]: any };