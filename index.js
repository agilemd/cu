var I = function (x) {
  return x
}

var Cu = {}

Cu.comparator = function (scalarFn) {
  return function (itemA, itemB) {
    return scalarFn(itemA) === scalarFn(itemB)
  }
}

Cu.contains = function (col, itemA, comparatorFn) {
  if (!comparatorFn) {
    return col.indexOf(itemA) > -1
  }
  return col.some(function (itemB) {
    return comparatorFn(itemA, itemB)
  })
}

Cu.containsAll = function (colA, colB, comparatorFn) {
  return colB.every(function (item) {
    return Cu.contains(colA, item, comparatorFn)
  })
}
Cu.containsEvery = Cu.containsAll

Cu.containsAny = function (colA, colB, comparatorFn) {
  return colB.some(function (item) {
    return Cu.contains(colA, item, comparatorFn)
  })
}
Cu.containsSome = Cu.containsAny

Cu.trim = function (col) {
  return col.filter(function (item) {
    return item !== undefined && item !== null
  })
}

Cu.indexBy = function (col, scalarFn) {
  return col.reduce(function (i, val) {
    i[scalarFn(val)] = val
    return i
  }, {})
}

var toMemo = {}
Cu.to = function (prop) {
  return toMemo[prop] || (toMemo[prop] = function (obj) { return obj[prop] })
}

// type Predicate: (Value) => Boolean

// (col: Array, predicate: Predicate, trueFn: (Array) => Value, falseFn: (Array) => Value) => [Value, Value]
// Sorts a collection into two collections by a predicate, then applies them to a function for the true and false subsets.
Cu.fork = function (col, predicate, trueFn, falseFn) {
  var binned = col.reduce(function (acc, ele) {
    if (predicate(ele)) {
      // trues go in 1 (binary true)
      acc[1].push(ele)
    } else {
      acc[0].push(ele)
    }
    return acc
  }, [[],[]])

  return [
    trueFn(binned[1]),
    falseFn(binned[0])
  ]
}

module.exports = Cu