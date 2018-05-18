var curry = require("curry")

function isPromise(x) {
  return (x instanceof Promise)
}

function identity(x) {
  return x
}

var zip = curry(function (keys, values) {
  return values.reduce(function (acc, value, index) {
    acc[keys[index]] = value
    return acc
  }, {})
})

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

  if (input instanceof Promise) {
    return input.then(data => map(func, data))
  }

  var keys = Object.keys(input)
  var results = Object.values(input).map(function (value, index) { 
    return func(value, keys[index])
  })
  var process = (input instanceof Array ? identity : zip(keys))

  if (results.filter(isPromise).length > 0) {
    return Promise.all(results).then(process)
  }

  return process(results)
}

module.exports = curry(map)
