const hub = require('hub.js')
// const { struct } = require('brisky-struct')

const n = 1e3

console.log('benchmark hub.js: n = ' + ((n / 1e3) | 0) + 'k')

// ok so something with context remove
// const cl = struct.create({
//   props: {
//     default: 'self'
//   }
// })

// const server = cl.create()

const server = hub()
// const server = struct.create()

const someData = {}

const val = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
  'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ' +
  'exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure ' +
  'dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'

let i = 1e3
while (i-- > 0) {
  const d = 1e11 + Math.round(Math.random() * 1e11)
  someData[`key-${d}-longer-string-${d}`] = {
    keyOne: { subKeyOne: val, subKeyTwo: val },
    keyTwo: { subKeyOne: val, subKeyTwo: val },
    keyThree: { subKeyOne: val, subKeyTwo: val },
    keyFour: { subKeyOne: val, subKeyTwo: val },
    keyFive: { subKeyOne: val, subKeyTwo: val }
  }
}

server.set({ someData })

var d = Date.now()
server.set(null)
console.log(Date.now() - d, 'ms')

// its context probably
