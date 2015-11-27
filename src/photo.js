var Three = require('three')
var Tween = require('tween.js')
var vs = require('./shaders/photo.vs')
var fs = require('./shaders/photo.fs')
var tex = require('./resources').textures
var camera = require('./view').camera

/*
 * Default uniform values
 */
var uniforms = {
  camPos: {type: 'v3', value: camera.position},
  fAlpha: {type: 'f', value: 1},
  fSepia: {type: 'f', value: 0},
  frame: {type: 't', value: tex.frame},
  texture: {type: 't'}
}
var material = new Three.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: vs,
  fragmentShader: fs,
})

var uniformNames = Object.keys(uniforms)

/**
 * Photo class to handle manipulations with photos
 *
 * @param {Number} size
 * @param {Array} pos
 * @param {Object} params
 * @constructor
 */

function Photo (size, pos, params) {
  this.defaults = arguments
  this.geometry = new Three.PlaneGeometry(size, size)
  this.material = material.clone()
  this.mesh = new Three.Mesh(this.geometry, this.material)

  this.reset()
}

var p = Photo.prototype

/**
 * Reset photo params to initial values
 */

p.reset = function() {
  var args = this.defaults
  var params = args[2]
  this.mesh.position.set.apply(this.mesh.position, args[1])
  if (!params)
    return
  for (var i = 0; i < uniformNames.length; i++) {
    this.material.uniforms[uniformNames[i]].value = params[uniformNames[i]] != null
      ? params[uniformNames[i]]
      : uniforms[uniformNames[i]].value
  }
  if (params.texture)
    this.material.uniforms.texture.needsUpdate = true
}

/**
 * Fade photo to val during time.
 *
 * @param {Number} val
 * @param {Number} time
 * @return {Tween}
 */

p.fade = function (val, time) {
 return new Tween.Tween(this.material.uniforms.fAlpha)
    .to({value: val}, time || 1000)
}

/**
 * Apply sepia filter to photo with val ratio during time.
 *
 * @param {Number} val
 * @param {Number} time
 * @return {Tween}
 */

p.sepia = function (val, time) {
  return new Tween.Tween(this.material.uniforms.fSepia)
     .to({value: val}, time || 1000)
}

/**
 * Change position of the photo during time.
 *
 * @param {Object} val
 * @param {Number} time
 * @return {Tween}
 */

p.pos = function(val, time) {
  return new Tween.Tween(this.mesh.position)
     .to(val, time || 1000)
}

module.exports = Photo
