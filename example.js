var map = require('./index');

var object = {
    a: 100,
    b: 200
};

var array = [100, 200];

function double(number) {
    return number * 2;
}

// Complete application
console.log(map(double, object));
console.log(map(double, array));


// Partial application
var doubleEachElement = map(double);
console.log(doubleEachElement(object));
console.log(doubleEachElement(array));
