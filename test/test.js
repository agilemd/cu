var chai = require('chai')
chai.should()
chai.use(require('chai-interface'))

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
})