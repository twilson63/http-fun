/**
 * httpCompose
 *
 * Takes one or more functions as arguments
 * @returns {function} - function (req, res) { ... }
 *
 */
module.exports = function(...fns) {
  // validate functions
  fns.forEach(fn => {
    if (typeof fn !== 'function') {
      throw new Error('all arguments must be functions!')
    }
  })
  return function(req, res) {
    fns.reverse().reduce((obj, fn) => fn(obj), { req, res })
  }
}
