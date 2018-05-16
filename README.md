# poly-map
[![Build Status](https://travis-ci.org/acvos/poly-map.svg?branch=master)](https://travis-ci.org/acvos/poly-map)
Polymorphic curried map for functional style JS

## Motivation
Javascript provides a native map function for arrays. However, sometimes we need to apply the same function to all properties of an object. Sometimes we are not sure or do not care which type of data we receive as an input. Sometimes we don't even know if the data is in fact present. So we end up writing loops, type checks, etc. Poly-map solves this problem in a generic way works equally well with arrays and objects so you never have to write those annoying iterations again.

## Features
- Works with objects and arrays
- Preserves original object keys
- Automatically curried
- Doesn't break when the input value is undefined
- Maps over promises

## Installation

```
npm install poly-map
```

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

// Maybe
var result = map(double, undefined);
// -> undefined

result = map(double, array);
// -> [200, 400]

// Promise support
const data = Promise.resolve([100, 200])
map(double, data).then(console.log)
// -> [200, 400]

// Pipeline-style usage
getDataAsPromise()
    .then(map(double))
    .then(console.log)
```

## Testing

```
npm test
```