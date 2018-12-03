const httpCompose = require('@twilson63/http-compose')
const bodyJSON = require('@twilson63/body-json')
const sendJSON = require('@twilson63/send-json')

module.exports = httpCompose(
  ({ body, send }) => {
    body()
      .then(send)
      .catch(err => {
        console.log(err)
        send({ ok: false })
      })
  },
  sendJSON,
  bodyJSON
)
