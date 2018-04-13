const expect = require("expect.js")
const map = require("./index.js")

test('maps over arrays ', function () {
  expect(map(x => x.toUpperCase(), ['wow', 'such', 'much'])).to.eql(['WOW', 'SUCH', 'MUCH'])
  expect(map(x => x * 2, [100, 200])).to.eql([200, 400])
})

test('maps over objects', function () {
  expect(map(x => x.toUpperCase(), { doge: 'wow', such: 'much' })).to.eql({ doge: 'WOW', such: 'MUCH' })
  expect(map(x => x * 2, { doge: 100, wow: 200 })).to.eql({ doge: 200, wow: 400 })
})

test('curried', function () {
  let test = map(x => x.toUpperCase())
  expect(test(['wow', 'such', 'much'])).to.eql(['WOW', 'SUCH', 'MUCH'])
  expect(test({ doge: 'wow', such: 'much' })).to.eql({ doge: 'WOW', such: 'MUCH' })

  test = map(x => x * 2)
  expect(test([100, 200])).to.eql([200, 400])
  expect(test({ doge: 100, wow: 200 })).to.eql({ doge: 200, wow: 400 })
})

test("doesn't break on undefined", function () {
  let test = map(x => x.toUpperCase())
  expect(test(undefined)).to.eql(undefined)

  test = map(x => x * 2)
  expect(test(undefined)).to.eql(undefined)
})

test("breaks on data that can't be iterated over", function () {
  expect(() => map(x => x.toUpperCase(), 'doge approve')).to.throwException()
  expect(() => map(x => x.toUpperCase(), 0)).to.throwException()
  expect(() => map(x => x.toUpperCase(), 100500)).to.throwException()
  expect(() => map(x => x.toUpperCase(), true)).to.throwException()
  expect(() => map(x => x.toUpperCase(), false)).to.throwException()
  expect(() => map(x => x.toUpperCase(), null)).to.throwException()
  expect(() => map(x => x.toUpperCase(), new RegExp('sss'))).to.throwException()
})
