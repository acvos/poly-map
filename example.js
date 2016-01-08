var map = require('./index');

var object = {
    a: 100,
    b: 200
};

var array = [100, 200];

function double(number) {
    return number * 2;
}

console.log(map(double, object));
console.log(map(double, array));

// Pipeline-style usage
// getDataAsPromise()
//     .then(map(double))
//     .then(console.log)
