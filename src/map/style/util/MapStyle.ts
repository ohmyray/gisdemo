export class MapboxStyle {
  constructor() {}
  _id!: string
  //   _layerMap!: Map<any, any>
  //   _sourceMap!: Map<any, any>
  _layers: any[] = []
  _sources: any[] = []
  _version!: number
  _sprite!: string
  _glyphs!: string
  _metadata: any

  public get style(): any {
    return {
      id: this._id,
      sprite: this._sprite,
      glyphs: this._glyphs,
      metadata: this._metadata,
      layers: this._layers,
      sources: this._sources,
      version: this._version,
    }
  }

  public get id(): string {
    return this._id
  }

  public set id(id: string) {
    this._id = id
  }

  public set layer(layers: any[]) {
    this._layers = layers
  }

  public get layer(): any[] {
    return this._layers
  }

  public set sources(sources: any[]) {
    this._sources = sources
  }

  public get sources(): any[] {
    return this._sources
  }

  public set glyphs(glyphs: string) {
    this._glyphs = glyphs
  }

  public get glyphs(): string {
    return this._glyphs
  }

  public set sprite(sprite: string) {
    this._sprite = sprite
  }

  public get sprite(): string {
    return this._sprite
  }

  public set metadata(metadata: any) {
    this._metadata = metadata
  }

  public get metadata(): any {
    return this._metadata
  }

  public set version(version: any) {
    this._version = version
  }

  public get version(): any {
    return this._version
  }
}
