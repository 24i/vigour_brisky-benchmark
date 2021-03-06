const perf = require('brisky-performance')
const { create, get } = require('brisky-struct')
const n = 1e5
const State = require('vigour-state') // eslint-disable-line

console.log('benchmark context: n = ' + ((n / 1e3) | 0) + 'k')

perf(() => {
  const orig = create({
    types: {
      ha: { bla: 'hello' }
    },
    a: { type: 'ha' }
  })
  orig.subscribe({ a: { bla: true } }, () => {})
  for (let i = 0; i < n; i++) {
    get(orig.types.ha, 'bla').set(i)
  }
}, () => {
  const orig = create({
    a: { bla: 'hello' }
  })
  orig.subscribe({ a: { bla: true } }, () => {})
  for (let i = 0; i < n; i++) {
    get(orig.a, 'bla').set(i)
  }
}, 'simple subscription')

perf(() => {
  const orig = new State({
    types: {
      ha: { bla: 'hello' }
    },
    a: { type: 'ha' }
  })
  orig.subscribe({ a: { bla: { val: true } } }, () => {})
  for (let i = 0; i < n; i++) {
    orig.types.ha.bla.set(i)
  }
}, () => {
  const orig = new State({
    a: { bla: 'hello' }
  })
  orig.subscribe({ a: { bla: { val: true } } }, () => {})
  for (let i = 0; i < n; i++) {
    orig.a.bla.set(i)
  }
}, 'simple subscription (old)')
