var curry = require("curry");

function map(func, object) {
  if (object instanceof Array) {
    return object.map(func)
  }

  var result = {}

  for (var i in object) {
    result[i] = func(object[i], i);
  }

  return result;
}

module.exports = curry(map);
