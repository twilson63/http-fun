const { parse } = require('url')

module.exports = queryparams

/**
 *
 * @param {object} ctx - contains req, res and other props
 */
function queryparams({ req, res, ...rest }) {
  const { query } = parse(req.url, true)
  return { req, res, query, ...rest }
}
