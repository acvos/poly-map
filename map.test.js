const map = require("./index.js")

test('maps over arrays ', function () {
  expect(map(x => x.toUpperCase(), ['wow', 'such', 'much'])).toEqual(['WOW', 'SUCH', 'MUCH'])
  expect(map(x => x * 2, [100, 200])).toEqual([200, 400])
})

test('maps over plain objects', function () {
  expect(map(x => x.toUpperCase(), { doge: 'wow', such: 'much' })).toEqual({ doge: 'WOW', such: 'MUCH' })
  expect(map(x => x * 2, { doge: 100, wow: 200 })).toEqual({ doge: 200, wow: 400 })
})

test('the function has access to value and key', function () {
  expect(map((v, k) => [v, k], { doge: 'wow', such: 'much' })).toEqual({ doge: ['wow', 'doge'], such: ['much', 'such'] })
})

test('maps over custom objects', function () {
  const User = function (name, role) {
    this.name = name
    this.role = role
  }

  expect(map(x => x.toUpperCase(), new User('doge', 'very'))).toEqual({ name: 'DOGE', role: 'VERY' })
})

test('curried', function () {
  let test = map(x => x.toUpperCase())
  expect(test(['wow', 'such', 'much'])).toEqual(['WOW', 'SUCH', 'MUCH'])
  expect(test({ doge: 'wow', such: 'much' })).toEqual({ doge: 'WOW', such: 'MUCH' })

  test = map(x => x * 2)
  expect(test([100, 200])).toEqual([200, 400])
  expect(test({ doge: 100, wow: 200 })).toEqual({ doge: 200, wow: 400 })
})

test("doesn't break on undefined", function () {
  let test = map(x => x.toUpperCase())
  expect(test(undefined)).toEqual(undefined)

  test = map(x => x * 2)
  expect(test(undefined)).toEqual(undefined)
})

test("breaks on data that can't be iterated over", function () {
  expect(() => map(x => x.toUpperCase(), 'doge approve')).toThrow()
  expect(() => map(x => x.toUpperCase(), String('doge approve'))).toThrow()
  expect(() => map(x => x.toUpperCase(), 0)).toThrow()
  expect(() => map(x => x.toUpperCase(), 100500)).toThrow()
  expect(() => map(x => x.toUpperCase(), true)).toThrow()
  expect(() => map(x => x.toUpperCase(), false)).toThrow()
  expect(() => map(x => x.toUpperCase(), null)).toThrow()
  expect(() => map(x => x.toUpperCase(), new RegExp('sss'))).toThrow()
})

test("map(Promise) -> Promise(map)", function () {
  let test = map(x => x.toUpperCase())

  let input = Promise.resolve(['doge', 'wow'])
  test(input).then(x => expect(x).toEqual(['DOGE', 'WOW']))

  input = Promise.resolve({ doge: 'wow', such: 'much' })
  test(input).then(x => expect(x).toEqual({ doge: 'WOW', such: 'MUCH' }))
})

test("Supports async functions", function () {
  let test = map(x => Promise.resolve(x.toUpperCase()))

  let input = Promise.resolve(['doge', 'wow'])
  test(input).then(x => expect(x).toEqual(['DOGE', 'WOW']))

  input = Promise.resolve({ doge: 'wow', such: 'much' })
  test(input).then(x => expect(x).toEqual({ doge: 'WOW', such: 'MUCH' }))
})
