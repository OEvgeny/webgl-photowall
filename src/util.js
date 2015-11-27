
/**
 * Generate a set of int numbers or one if count is not present.
 *
 * @param {Number} min
 * @param {Number} max
 * @param {Number} count
 */

function rand(min, max, count) {
  var arr
  if (count) {
    arr = []
    for (var i = 0; i < count; i++) {
      arr.push(rand(min, max))
    }
    return arr
  }
  return Math.floor(Math.random() * (max - min) + min)
}

exports.rand = rand
