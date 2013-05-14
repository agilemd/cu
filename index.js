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

module.exports = Cu