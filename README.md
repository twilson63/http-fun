# http-fun

A set of composable functions that can provide resuable helpers for https serverless functions.

## Usage

Weather Fetch example

```js
require('isomorphic-fetch')
const httpCompose = require('@twilson63/http-compose')
const queryparams = require('@twilson63/queryparams')
const sendJSON = require('@twilson63/send-json')

module.exports = httpCompose(
  async ({ query, send }) => {
    const locations = await fetch(
      'https://www.metaweather.com/api/location/search?q=' + query.q
    ).then(r => r.json())
    const forecast = await fetch(
      'https://www.metaweather.com/api/location/' +
        locations[0].woeid +
        '/forecast'
    ).then(r => r.json())
  },
  sendJSON,
  queryparams
)
```
