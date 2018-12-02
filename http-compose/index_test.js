const test = require('tape')
const httpCompose = require('./index')
const { parse } = require('url')

test('compose set of functions and return a function that handles an http req', t => {
  const req = {
    url: 'http://example.com/?query=foo'
  }
  const res = {
    end: s => {
      t.equals('Hello World', s)
      t.end()
    }
  }
  httpCompose(({ req, res, query }) => {
    t.equals('foo', query.query)
    res.end('Hello World')
  }, queryparams)(req, res)
})

test('should only allow functions', t => {
  try {
    httpCompose('beep')
  } catch (err) {
    t.equals('all arguments must be functions!', err.message)
    t.end()
  }
})

function queryparams({ req, res, ...rest }) {
  const { query } = parse(req.url, true)
  return { req, res, query, ...rest }
}
