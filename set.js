const perf = require('brisky-performance')
const { create, get, set } = require('brisky-struct')
const n = 1e6

console.log('benchmark context: n = ' + ((n / 1e3) | 0) + 'k')

const simple = () => {
  const s = create()
  let i = n
  while (i--) {
    set(s, i)
  }
}

perf(simple, () => {
  const s = {}
  let i = n
  while (i--) {
    s.val = i
  }
}, 'simple set', 25)

perf(() => {
  const s = create()
  let i = n
  while (i--) {
    set(s, { val: i })
  }
}, simple, 'simple set', 2)
