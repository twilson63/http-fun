const test = require('tape')
const sendJSON = require('./index')

test('send a json document as a proper response', t => {
  const { req, res, send } = sendJSON(
    getMocks(body => {
      t.equals('s-maxage=3600', res.headers['Cache-Control'])
      t.equals('201', res.statusCode)
      t.equals(JSON.stringify({ foo: 'bar' }), body)
      t.end()
    })
  )
  send({ foo: 'bar' }, '201', { 'Cache-Control': 's-maxage=3600' })
})

test('send invalid document', t => {
  const { req, res, send } = sendJSON(getMocks(body => null))
  try {
    send('Beep: Boop')
  } catch (err) {
    t.equals('object required for body.', err.message)
    t.end()
  }
})

function getMocks(end) {
  let headers = {}
  const req = {}
  const res = {
    headers,
    end,
    setHeader: (k, v) => {
      headers = Object.assign(headers, { [k]: v })
    },
    statusCode: '200'
  }
  return { req, res }
}
