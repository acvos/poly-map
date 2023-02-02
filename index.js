function isObject(x) {
  return typeof x === "object" && x !== null
}

function zip(keys) {
  return function (values) {
    var output = {}
    for (var i = 0; i < keys.length; i++) {
      output[keys[i]] = values[i]
    }

    return output
  }
}

function apply(func, value, key) {
  if (value === undefined || value === null) {
    return value
  }

  if (value instanceof Promise) {
    return value.then(function (x) { return func(x, key) })
  }

  return func(value, key)
}

function mapArray(func, input) {
  var wait = false

  var output = [], wait = false
  for (var i = 0; i < input.length; i++) {
    var result = apply(func, input[i], i)
    if (result instanceof Promise) {
      wait = true
    }

    output[i] = result
  }

  return wait ? Promise.all(output) : output
}

function mapObject(func, input) {
  var keys = Object.keys(input)

  var values = [], wait = false
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]

    var result = apply(func, input[key], key)
    if (result instanceof Promise) {
      wait = true
    }

    values[i] = result
  }

  const zipWithKeys = zip(keys)

  return wait ? Promise.all(values).then(zipWithKeys) : zipWithKeys(values)
}

function map(func) {
  return function (input) {
    if (!isObject(input)) {
      return apply(func, input)
    }

    if (input instanceof Promise) {
      return input.then(map(func))
    }

    return input instanceof Array
      ? mapArray(func, input)
      : mapObject(func, input)
  }
}

module.exports = function () {
  const args = Array.prototype.slice.call(arguments)

  return args.length === 1
    ? map(args[0])
    : map(args[0])(args[1])
}
