const { create, get, set } = require('brisky-struct')
const n = 1e3

console.log('benchmark hub.js: n = ' + ((n / 1e3) | 0) + 'k')

const simple = () => {
  const s = create()
  let i = n
  while (i--) {
    set(s, i)
  }
}
