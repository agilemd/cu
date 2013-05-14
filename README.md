# Cu
Copper - collection utilities

Copper's API aims to be properly extensible using functions, not magic string parameters

## usage

    var Cu = require('cu')

## api

### `Cu.comparator(scalarFn: Function) => Comparator`

Returns a `Comparator: (itemA: Value, itemB: Value) => Boolean` - a function which compares two values for equality. For example, if you want to consider two objects equal if their `_id` properties are stringwise equal, you could create a Comparator with:

    var idComparator = Cu.comparator(function (obj) {
      return obj._id.toString()
    })

### `Cu.contains(colA: Array, item: Value, Comparator?) => Boolean`

returns true if a collection contains a thing

### `Cu.containsAll(colA: Array, ColB: Array, Comparator?) => Boolean`

returns true if a collection is a superset of a second collection

### `Cu.containsAny(colA: Array, colB: Array, Comparator?) => Boolean`

returns true if a collection intersects with a second collection

## installation

    $ npm install cu


## running the tests

From package root:

    $ npm install
    $ npm test


## contributors

- jden <jason@denizac.org>


## license

MIT. (c) 2013 Agile Diagnosis <hello@agilediagnosis.com>. See LICENSE.md
