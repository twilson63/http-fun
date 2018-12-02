# queryparams

A http composable handler that extracts the query params from an url and adds them to the http ctx object

## Usage

```js
module.exports = httpCompose(
  ({ req, res, query, send }) => {
    send({ echo: query.echo })
  },
  sendJSON,
  queryparams
)
```
