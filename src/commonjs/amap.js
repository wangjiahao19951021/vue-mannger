/*
 * 异步创建script标签 封装的vue引入地图
 */
export default function MapLoader () { 
    return new Promise((resolve, reject) => {
      if (window.AMap) {
        resolve(window.AMap)
      } else {
        var key = "5f937b78f627044ff7b0023717a0ba68"
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.async = true
        script.src = 'http://webapi.amap.com/maps?v=1.3&callback=initAMap&key=' + key + '&callback=init'
        script.onerror = reject
        document.head.appendChild(script)
      }
      window.initAMap = () => {
        resolve(window.AMap)
      }
    })
  }
  