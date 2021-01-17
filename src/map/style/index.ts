import { MapboxStyle } from './util/MapStyle'

// 样式前缀
// enum StylePrefix {
//   MAPBOX = 'mapbox://',
//   WEBGIS = 'webgis://',
//   MINEMAP = 'minemap://',
// }
enum StylePrefix {
  MAPBOX = 'mapbox',
  WEBGIS = 'webgis',
  MINEMAP = 'minemap',
  HTTP = 'http',
}

class ObtSytle {
  constructor() {
    // 管理者
    this._regulator = new MapboxStyle()
  }
  _regulator!: MapboxStyle
  _rule!: StylePrefix
  _inputStyle!: any
  _outputStyle!: any

  SerializableStyle(style: string): any {
    this.resolveStyle(style)
    return {}
  }

  resolveStyle(style: any) {
    console.log('resolveStyle()', style)
    // 正则匹配  /^[a-z]+:\/\//i  前面的前缀://
    const regex = /^(([a-z]+):\/\/)/i
    let m
    let styleHead: any[] = []
    if ((m = regex.exec(style)) !== null)
      m.forEach((match, groupIndex) => styleHead.push(match))

    // 地图样式规则凭借
    // let execStr: string = ''
    // for (let mapType in window['mapSupport']) {
    //   window['mapSupport'][mapType]
    //   execStr + `case '${execStr}':

    //                break;
    //              default:
    //                break;
    //   `
    // }

    // switch (styleHead[2]) {
    //   case value:

    //     break;

    //   default:
    //     break;
    // }
    // console.log(result)
    // `switch(${styleHead[2]}) {
    //   case "mapbox":
    //     console.log(1111)
    //   break;
    //   default:
    //   break;
    // }`
    // for()
    // eval()

    // for(var key in StylePrefix) {
    //   console.log(key);
    //   var keyToAny:any = key;
    //   StylePrefix[keyToAny]
    // }
    // console.log(styleHead[1]);
    
    switch (styleHead[2]) {
      case StylePrefix.MAPBOX:
          console.log('mapbox');
          
        break;
      case StylePrefix.MINEMAP:
        
        break;
      case StylePrefix.WEBGIS:
        
        break;
    
      default:
        break;
    }
    
  }
}

export { ObtSytle }
