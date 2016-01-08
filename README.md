# poly-map
Polymorphic curried map for functional style JS

## Motivation
Quite often we need to apply a function over an object preserving the object's key structure. Javascript provides us with a native map function that works with arrays, but when we deal with objects we find ourselves writing a lot of identical loops. This tool works equally well with both arrays and objects so you never have to write those annoying iterations again.

## Features
- Works with objects and arrays
- Preserves original object keys
- Automatically curried

## Usage

```javascript
var map = require('poly-map');

var object = {
    a: 100,
    b: 200
};

var array = [100, 200];

function double(number) {
    return number * 2;
}

// Basic map
var result = map(double, object);
// -> {a: 200, b: 400}

result = map(double, array);
// -> [200, 400]


// Pipeline-style usage
getDataAsPromise()
    .then(map(double))
    .then(console.log)
```

