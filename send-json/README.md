# Send JSON

A composable way to send json objects in your http server functions.

## Usage

```js
module.exports = httpCompose(({ req, res, send }) => {
  send({ hello: "world" });
}, sendJSON);
```

## Peer Dependencies

sendJSON works best with httpCompose, which returns a http request handler function and passes it through a set of composed functions, these functions pass an object from one to another with the req, and res, as props, with the ability for each other function to add additional props.
