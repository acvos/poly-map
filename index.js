var curry = require("curry")

function map(func, object) {
  if (object === undefined) {
    return undefined
  }

  if (object === null) {
    throw new Error("[poly-map] Can't iterate over null")
  }
  else if (typeof object !== "object") {
    throw new Error("[poly-map] Can't iterate over " + typeof object)
  }
  else if (object.constructor.name !== 'Object' && object.constructor.name !== 'Array') {
    throw new Error("[poly-map] Can't iterate over " + object.constructor.name)
  }

  if (object instanceof Array) {
    return object.map(func)
  }

  var result = {}

  for (var i in object) {
    result[i] = func(object[i], i)
  }

  return result
}

module.exports = curry(map)
