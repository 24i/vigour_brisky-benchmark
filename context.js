const perf = require('brisky-performance')
const { create, get } = require('brisky-struct')
const n = 1e5
const State = require('vigour-state') // eslint-disable-line

console.log('benchmark context: n = ' + ((n / 1e3) | 0) + 'k')

perf(() => {
  var cnt = 0
  const orig = create({
    types: {
      ha: { bla: 'hello' }
    },
    a: { type: 'ha' }
  })
  orig.subscribe({
    a: { bla: true }
  }, () => { cnt++ })
  for (let i = 0; i < n; i++) {
    get(orig.types.ha, 'bla').set(i)
  }
}, () => {
  var cnt = 0
  const orig = create({
    a: { bla: 'hello'  }
  })
  orig.subscribe({
    a: { bla: true }
  }, () => {
    cnt++
  })
  for (let i = 0; i < n; i++) {
    get(orig.a, 'bla').set(i)
  }
}, 'simple subscription')

perf(() => {
  var cnt = 0
  const orig = new State({
    types: {
      ha: { bla: 'hello' }
    },
    a: { type: 'ha' }
  })
  orig.subscribe({
    a: { bla: { val: true } }
  }, () => { cnt++ })
  for (let i = 0; i < n; i++) {
    orig.types.ha.bla.set(i)
  }
}, () => {
  var cnt = 0
  const orig = new State({
    a: { bla: 'hello'  }
  })
  orig.subscribe({
    a: { bla: { val: true } }
  }, () => {
    cnt++
  })
  for (let i = 0; i < n; i++) {
    orig.a.bla.set(i)
  }
}, 'simple subscription (old)')