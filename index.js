var curry = require("curry")

function isPromise(x) {
  return (x instanceof Promise)
}

var zip = curry(function (initialValue, keys, values) {
  return values.reduce(function (acc, value, index) {
    acc[keys[index]] = value
    return acc
  }, initialValue)
})

function map(func, input) {
  if (input === undefined) {
    return undefined
  }

  if (input === null) {
    throw new Error("[poly-map] Can't iterate over null")
  } else if (typeof input !== "object"
    || input.constructor === RegExp) {
    throw new Error("[poly-map] Can't iterate over " + typeof input)
  }

  if (input instanceof Promise) {
    return input.then(function (data) { return map(func, data) })
  }

  var result = (input instanceof Array ? [] : {})
  var keys = Object.keys(input)
  var i, key, wait = false

  for (i = 0; i < keys.length; i++) {
    key = keys[i]
    result[key] = func(input[key], key)

    if (isPromise(result[key])) {
      wait = true
    }
  }

  if (!wait) {
    return result
  }

  var initialValue = (input instanceof Array ? [] : {})
  return Promise.all(Object.values(result)).then(zip(initialValue, keys))
}

module.exports = curry(map)
