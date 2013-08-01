var chai = require('chai')
chai.should()
chai.use(require('chai-interface'))
var lug = require('lug')

describe('cu', function () {
  var Cu = require('../')

  it('interface', function () {
    Cu.should.have.interface({
      comparator: Function,
      contains: Function,
      containsAll: Function,
      containsEvery: Function,
      containsAny: Function,
      containsSome: Function
    })
  })

  describe('contains', function () {
    it('returns true if a collection contains a thing', function () {
      var coll = [1, 2, 3, 'thing']
      var thing = 'thing'
      Cu.contains(coll, thing).should.equal(true)
      Cu.contains(coll, 2).should.equal(true)
      Cu.contains(coll, 18).should.equal(false)
    })
    it('takes a comparator overload', function () {
      var coll = [1, 2, 3, 'thing']
      var thing = 'thing'
      var stringwise = function (a, b) { return a.toString() === b.toString() }
      Cu.contains(coll, '2', stringwise).should.equal(true)
      Cu.contains(coll, '2').should.equal(false)
      Cu.contains(coll, 2).should.equal(true)
    })
  })

  describe('containsAll', function () {
    it('returns true if a collection is a superset of a second collection', function () {
      var coll = [1,2,3]
      Cu.containsAll(coll, coll).should.equal(true)
      Cu.containsAll(coll, [1,6]).should.equal(false)
    })
  })

  describe('containsAny', function () {
    it('returns true if a collection intersects with a second collection', function () {
      var coll = [1, 2, 3]
      Cu.containsAny(coll, [3,4,5]).should.equal(true)
      Cu.containsAny(coll, [4,5, 6]).should.equal(false)
    })
  })

  describe('trim', function () {
    it('removes null or undefined elements from an array', function () {
      var arr = [1,2,3,4,false,null,undefined,5]
      Cu.trim(arr).should.deep.equal([1,2,3,4,false,5])
    })
  })

  describe('indexBy', function () {
    it('returns a dictionary of things of index-value pairs', function () {
      var objs = [
        {name: 'k', id: 2},
        {name: 'j', id: 23}
      ]
      var indexed = Cu.indexBy(objs, function (x) { return x.name} )
      indexed.k.should.equal(objs[0])
      indexed.j.should.equal(objs[1])
    })
  })

  describe('to', function () {
    it('creates accessor functions', function () {
      var toName = Cu.to('name')
      toName.should.be.a('function')
      toName({name: 'foo'}).should.equal('foo')
    })
    it('is memoized', function () {
      var toName = Cu.to('name')
      var toName2 = Cu.to('name')
      toName.should.equal(toName2)
    })
  })

  describe('fork', function () {
    it('splits a collection by a predicate', function () {
      var nums = [0,1,2,3,4,5,6,7,8,9]
      var isEven = function (x) { return x % 2 === 0 }
      Cu.fork(
        nums,
        isEven,
        function evens (ns) {
          ns.forEach(function (n) {
            isEven(n).should.equal(true)
          })
          ns.should.deep.equal([0,2,4,6,8])
        },
        function odds (ns) {
          ns.forEach(function (n) {
            isEven(n).should.equal(false)
          })
          ns.should.deep.equal([1,3,5,7,9])
        })
    })
    it('returns a 2-tuple of return values from the trueFn and falseFn', function () {
      var vals = [true, true, false, true]
      var identity = function (x) { return x }
      var count = function (x) { return x.length }
      Cu.fork(vals, identity, count, count).should.deep.equal([3, 1])
    })
  })

  describe('forkFlat', function () {
    it('is like Cu.fork, but it flattens the result', function () {
      var vals = [1,1,1,2,2]
      var isEven = function (x) { return x % 2 === 0 }
      var identity = function (x) { return x }
      var triple = function (x) { return x.map(function(n) { return 3*n }) }
      Cu.forkFlat(vals, isEven, triple, identity).should.deep.equal([6,6,1,1,1])
    })
  })

  describe('flat', function () {
    it('peels back a layer', function () {
      Cu.flat([[1],[2]]).should.deep.equal([1,2])
    })
  })

  describe('cartesianSquare', function () {

    it('eg', function () {
      Cu.cartesianSquare([1],[2]).should.deep.equal([[1, 2]])
      Cu.cartesianSquare([1,2],[3,4]).should.deep.equal([
        [1,3],
        [1,4],
        [2,3],
        [2,4]
      ])
    })
  })
})