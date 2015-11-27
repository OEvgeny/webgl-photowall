var Three = require('three')
var tex = require('./resources').textures
var _ = require('./util')
var view = require('./view')

var xLen = 12
var yLen = 7

var scene = new Three.Scene()
var raycaster = new Three.Raycaster()

/**
 * Create grid of the photos xCount x yCount.
 *
 * @param {Number} xCount
 * @param {Number} yCount
 * @param {Number} size
 * @param {Number} offset
 */

function grid (xCount, yCount, size, offset) {
  var Photo = require('./photo')
  var photos = []
  var xSize = (xCount * (size + offset)) - offset
  var xHalf = (xSize - size) / 2
  var ySize = (yCount * (size + offset)) - offset
  var yHalf = (ySize - size) / 2
  for (var i = 0; i < xSize; i+= size + offset) {
    for (var j = 0; j < ySize; j+= size + offset) {
      var name = 'pic' + _.rand(1, 11)
      var photo = new Photo(size, [i - xHalf, j - yHalf, 0], {
        fAlpha: 0,
        texture: tex[name]
      })
      photos.push(photo)
      photo.fade(1).delay((i + j) * 25).start()
    }
  }
  return photos
}

/**
 * Create scene and start animations.
 */

function init () {
  var group = new Three.Object3D()
  scene.add(group)

  var photos = grid(xLen, yLen, 2.5, 0.5)
  var meshes = photos.map(function (p) {return p.mesh})
  group.add.apply(scene, meshes)

  /* Animate sepia for random photos */
  setInterval(function () {
    var r = _.rand(0, xLen * yLen, 10)
    r.forEach(function(index) {
      photos[index].sepia(Math.random(), 1500).start()
    })
  }, 1800)

  /* Animate alpha for random photos */
  setInterval(function () {
    var r = _.rand(0, xLen * yLen, 5)
    r.forEach(function(index) {
      if (!photos[index].isBusy) {
        photos[index].fade(Math.random(), 3000).start()
      }
    })
  }, 2000)

  /* Animate position for random photos */
  setInterval(function () {
    var r = _.rand(0, xLen * yLen, 10)
    r.forEach(function(index) {
      photos[index].pos({z:(Math.round(Math.random()) - 0.5) / 1.5}, 500).start()
    })
  }, 2000)

  /* Animate photos that intersects with pointer */
  setInterval(function () {
    raycaster.setFromCamera(view.pointer, view.camera)
    var intersects = raycaster.intersectObjects(scene.children)

    for (var i = 0; i < intersects.length; i++) {
      var index = meshes.indexOf(intersects[i].object)
      if (index > -1) {
        var photo = photos[index]
        photo.pos({z: 1}, 500)
          .start()
      }
  	}
  }, 100)
}

module.exports = scene
module.exports.init = init
