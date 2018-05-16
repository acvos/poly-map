var curry = require("curry")

function map(func, input) {
  if (input === undefined) {
    return undefined
  }

  if (input === null) {
    throw new Error("[poly-map] Can't iterate over null")
  }
  else if (typeof input !== "object"
    || input.constructor === RegExp) {
    throw new Error("[poly-map] Can't iterate over " + typeof input)
  }

  if (input instanceof Array) {
    return input.map(func)
  }

  if (input instanceof Promise) {
    return input.then(data => map(func, data))
  }

  var result = {}

  for (var i in input) {
    result[i] = func(input[i], i)
  }

  return result
}

module.exports = curry(map)
