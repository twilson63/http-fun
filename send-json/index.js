module.exports = sendJSON

/**
 *
 * @param {object} httpObject - an object that contains the req, res and other props that can be
 * chained together
 */
function sendJSON({ req, res, ...rest }) {
  /**
   * sends a json response to http client
   *
   * @param {object} body - body object to be sent as json
   * @param {string} statusCode - response status code, default is 200
   * @param {object} headers - additional headers to send with response
   */
  function send(body, statusCode = '200', headers = {}) {
    if (typeof body !== 'object') {
      throw new Error('object required for body.')
    }
    res.statusCode = statusCode
    res.setHeader('content-type', 'application/json')
    Object.keys(headers).forEach(key => {
      res.setHeader(key, headers[key])
    })
    res.end(safeStringify(body))
  }

  return { req, res, send, ...rest }
}

/**
 * converts a javascript object into a json string
 *
 * @param {object} data
 * @returns {string}
 */
function safeStringify(data) {
  try {
    const result = JSON.stringify(data)
    return result
  } catch (err) {
    return null
  }
}
