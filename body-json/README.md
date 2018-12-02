# @twilson63/body

composable body parser function, this function returns a promise that can be invoked to 
perform the actual parsing of the body in to a js object.

## Usage

``` js
module.exports = httpCompose(
  async ({body, send}) => {
    const doc = await body()
    send({ok: true})
  },
  sendJSON,
  bodyParser
)
```
 
