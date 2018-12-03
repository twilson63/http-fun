const getRawBody = require('raw-body')

/**
 *
 *  @param {object} ctx -
 */
module.exports = ({ req, res, ...rest }) => {
  function body() {
    return getRawBody(req, {
      encoding: true
    }).then(safeParse)
  }
  return { req, res, body, ...rest }
}

/**
 *
 * @param {string} text
 */
function safeParse(text) {
  try {
    return JSON.parse(text)
  } catch (err) {
    return null
  }
}
