var Three = require('three')
var Tween = require('tween.js')

var scene = require('./scene')

var pivot = new Three.Object3D()
var tween = new Tween.Tween(pivot.rotation)
var camera = new Three.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000)
var renderer = new Three.WebGLRenderer({antialias: true})
var pointer = {x: 0, y: 0}
var aspect
var gl = renderer.context


/**
 * Render content
 */
function render () {
	gl.enable(gl.BLEND)
	requestAnimationFrame(render)

	renderer.render(scene, camera)

	Tween.update()
}

/**
 * Resize canvas to fill window.
 */

function resize () {
  renderer.setSize(window.innerWidth, window.innerHeight)
  aspect = window.innerWidth / window.innerHeight

  camera.aspect = aspect
  camera.updateProjectionMatrix()
}

/**
 * Setup camera and document event listeners.
 * @param {Object} cameraPos
 */

function init (cameraPos) {
  if (cameraPos)
    camera.position
      .set(cameraPos.x || 0, cameraPos.y || 0, cameraPos.z || 0)

  document.addEventListener('mousemove', function (event) {
    pointer.x = (event.clientX / window.innerWidth) * 2.0 - 1.0
    pointer.y = -(event.clientY / window.innerHeight) * 2.0 + 1.0
  })

  document.addEventListener('resize', resize)
  resize()

  document.body.appendChild(renderer.domElement)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

  pivot.add(camera)
  scene.add(pivot)

  setInterval(function () {
    tween
      .stop()
      .to({
        x: -pointer.y * aspect / 4,
        y: pointer.x / aspect / 2,
        z: 0
      }, 600)
      .start()
  }, 200)
}

exports.camera = camera
exports.pointer = pointer
exports.init = init
exports.resize = resize
exports.render = render
