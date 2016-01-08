var curry = require("curry");

function map(func, object) {
  var result = (object instanceof Array) ? [] : {};

  for (var i in object) {
    result[i] = func(object[i], i);
  }

  return result;
}

module.exports = curry(map);
