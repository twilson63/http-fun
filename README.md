# http-fun

A set of composable functions that can provide resuable helpers for https serverless functions.

- `@twilson63/http-compose` - is the compose function, it takes on or more unairy functions as arguments and calls them from right to left passing the returned result as the ctx object.

> httpComposable Functions

- `@twilson63/send-json` - is a function that adds a send json function as a prop to the ctx object.
- `@twilson63/queryparams` - is a function that adds a query object that includes all the query params from the url.
- `@twilson63/body-json` - is a function that adds a body prop to the ctx object, when invoked it will parse the body of the request and return it as a json document.

## Usage

Weather Fetch example

```js
require('isomorphic-fetch')
const httpCompose = require('@twilson63/http-compose')
const queryparams = require('@twilson63/queryparams')
const sendJSON = require('@twilson63/send-json')

module.exports = httpCompose(
  async ({ query, send }) => {
    try {
      const locations = await fetch(
        'https://www.metaweather.com/api/location/search?query=' + query.q
      ).then(r => r.json())
      if (locations.length === 0) {
        throw new Error('location not found!')
      }
      const forecast = await fetch(
        'https://www.metaweather.com/api/location/' + locations[0].woeid
      ).then(r => r.json())
      send(forecast, '200', { 'Cache-Control': 's-maxage=86400' })
    } catch (err) {
      console.log(err.message)
      send({ ok: false }, '500')
    }
  },
  sendJSON,
  queryparams
)
```
