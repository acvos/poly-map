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
- Supports asynchronous functions

## Installation

```
npm install poly-map
```

## Usage

```javascript
let map = require('poly-map');

let object = {
    a: 100,
    b: 200
};

let array = [100, 200];

function double(number) {
    return number * 2;
}

// Basic map
let result = map(double, object);
// -> {a: 200, b: 400}

result = map(double, array);
// -> [200, 400]

// Maybe
result = map(double, undefined);
// -> undefined

// Primitives
result = map(double, 100);
// -> 200

// Promise support
let data = Promise.resolve([100, 200])
map(double, data).then(console.log)
// -> [200, 400]

// Promise support
data = [Promise.resolve(100), Promise.resolve(200)]
map(double, [data1, data2]).then(console.log)
// -> [200, 400]

// Pipeline-style usage
getDataAsPromise()
    .then(map(double))
    .then(console.log)

// Async function support
data = [100, 200]
map(x => fetch(`http://some.com/resource/${x}`, data)
    .then(map(x => x.json()))
    .then(console.log)
```

## Testing

```
npm test
```