const getRawBody = require('raw-body')

/**
 *
 *  @param {object} ctx -
 */
module.exports = ({ req, res, ...rest }) => {
  function body() {
    return getRawBody(req, {
      encoding: true
    }).then(safeStringify)
  }
  return { req, res, body, ...rest }
}

/**
 *
 * @param {string} text
 */
function safeStringify(text) {
  try {
    return JSON.stringify(text)
  } catch (err) {
    return null
  }
}
