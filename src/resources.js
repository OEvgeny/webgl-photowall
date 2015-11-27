var Three = require('three')
var loader = new Three.TextureLoader()
var textures = [
  {name: 'frame', url:'./images/frame.png'},
  {name: 'pic1', url:'./images/pic01.jpg'},
  {name: 'pic2', url:'./images/pic02.jpg'},
  {name: 'pic3', url:'./images/pic03.jpg'},
  {name: 'pic4', url:'./images/pic04.jpg'},
  {name: 'pic5', url:'./images/pic05.jpg'},
  {name: 'pic6', url:'./images/pic06.jpg'},
  {name: 'pic7', url:'./images/pic07.jpg'},
  {name: 'pic8', url:'./images/pic08.jpg'},
  {name: 'pic9', url:'./images/pic09.jpg'},
  {name: 'pic10', url:'./images/pic10.jpg'}
]
var loaded = {}

/**
 * Load textures and fire callback when loaded.
 *
 * @param {Function} done
 */
 
exports.load = function (done) {
  var count = 0
  var total = textures.length
  textures.forEach(function (entry) {
    loader.load(entry.url, function (tex) {
      loaded[entry.name] = tex
      count++
      if (count == total) {
        done(loaded)
      }
    })
  })
}

exports.textures = loaded
