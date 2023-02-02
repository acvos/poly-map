const { expect } = require("expect")

const map = require("../index.js")

describe('testing map()', function () {
  it('maps over arrays ', function () {
    expect(map(x => x.toUpperCase(), ['wow', 'such', 'much'])).toEqual(['WOW', 'SUCH', 'MUCH'])
    expect(map(x => x * 2, [100, 200])).toEqual([200, 400])
  })

  it('maps over plain objects', function () {
    expect(map(x => x.toUpperCase(), { doge: 'wow', such: 'much' })).toEqual({ doge: 'WOW', such: 'MUCH' })
    expect(map(x => x * 2, { doge: 100, wow: 200 })).toEqual({ doge: 200, wow: 400 })
  })

  it('the function has access to value and key', function () {
    expect(map((v, k) => [v, k], { doge: 'wow', such: 'much' })).toEqual({ doge: ['wow', 'doge'], such: ['much', 'such'] })
  })

  it('maps over custom objects', function () {
    const User = function (name, role) {
      this.name = name
      this.role = role
    }

    expect(map(x => x.toUpperCase(), new User('doge', 'very'))).toEqual({ name: 'DOGE', role: 'VERY' })
  })

  it("maps over strings", function () {
    const test = map(x => x.toUpperCase())

    expect(test("aaaaa")).toEqual("AAAAA")
    expect(test("whale now")).toEqual("WHALE NOW")
    expect(test(String('doge approve'))).toEqual("DOGE APPROVE")
    expect(test("")).toEqual("")
  })

  it("maps over numbers", function () {
    const test = map(x => x * 2)

    expect(test(0)).toEqual(0)
    expect(test(100)).toEqual(200)
    expect(test(1.5)).toEqual(3)
  })

  it("maps over booleans", function () {
    const test = map(x => !x)

    expect(test(true)).toEqual(false)
    expect(test(false)).toEqual(true)
  })

  it("doesn't break on undefined", function () {
    let test = map(x => x.toUpperCase())
    expect(test(undefined)).toEqual(undefined)

    test = map(x => x * 2)
    expect(test(undefined)).toEqual(undefined)
  })

  it("doesn't break on null", function () {
    let test = map(x => x.toUpperCase())
    expect(test(null)).toEqual(null)

    test = map(x => x * 2)
    expect(test(null)).toEqual(null)
  })

  it("map(Promise) -> Promise(map)", function () {
    let test = map(x => x.toUpperCase())

    let input = Promise.resolve(['doge', 'wow'])
    test(input).then(x => expect(x).toEqual(['DOGE', 'WOW']))

    input = [Promise.resolve('doge'), Promise.resolve('wow')]
    test(input).then(x => expect(x).toEqual(['DOGE', 'WOW']))

    input = Promise.resolve({ doge: 'wow', such: 'much' })
    test(input).then(x => expect(x).toEqual({ doge: 'WOW', such: 'MUCH' }))

    input = { doge: Promise.resolve('wow'), such: Promise.resolve('much') }
    test(input).then(x => expect(x).toEqual({ doge: 'WOW', such: 'MUCH' }))
  })

  it("Supports async functions", function () {
    let test = map(x => Promise.resolve(x.toUpperCase()))

    let input = Promise.resolve(['doge', 'wow'])
    test(input).then(x => expect(x).toEqual(['DOGE', 'WOW']))

    input = Promise.resolve({ doge: 'wow', such: 'much' })
    test(input).then(x => expect(x).toEqual({ doge: 'WOW', such: 'MUCH' }))

    input = ['doge', 'wow']
    test(input).then(x => expect(x).toEqual(['DOGE', 'WOW']))

    input = { doge: 'wow', such: 'much' }
    test(input).then(x => expect(x).toEqual({ doge: 'WOW', such: 'MUCH' }))
  })

  it('curried', function () {
    let test = map(x => x.toUpperCase())
    expect(test(['wow', 'such', 'much'])).toEqual(['WOW', 'SUCH', 'MUCH'])
    expect(test({ doge: 'wow', such: 'much' })).toEqual({ doge: 'WOW', such: 'MUCH' })

    test = map(x => x * 2)
    expect(test([100, 200])).toEqual([200, 400])
    expect(test({ doge: 100, wow: 200 })).toEqual({ doge: 200, wow: 400 })
  })
})