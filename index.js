var curry = require("curry")

function map(func, input) {
  if (input === undefined) {
    return undefined
  }

  if (input === null) {
    throw new Error("[poly-map] Can't iterate over null")
  }
  else if (typeof input !== "object") {
    throw new Error("[poly-map] Can't iterate over " + typeof input)
  }

  if (input instanceof Array) {
    return input.map(func)
  }

  if (input.constructor !== Object) {
    throw new Error("[poly-map] Can't iterate over " + input)
  }

  var result = {}

  for (var i in input) {
    result[i] = func(input[i], i)
  }

  return result
}

module.exports = curry(map)
