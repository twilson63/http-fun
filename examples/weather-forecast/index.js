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
