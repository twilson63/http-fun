# httpCompose

A function one or more functions as arguments and returns a function that takes a request and response object as arguments, when that function is invoked the httpCompose function creates an object with the req, and res objects and passes them through the callback functions.

## Usage

Using serverless functions or http request handler functions, httpCompose can create a reverse pipeline
adding functionality like sending json or parsing request body part of the composable chain.

> Each argument must be an unairy function that takes an object and returns an object

```js
const httpCompose = require('@twilson63/http-compose')

module.exports = httpCompose(({ req, res, send }) => {
  send({ date: new Date().toISOString() })
}, sendJSON)
```

## Install

```
npm install @twilson63/http-compose
```

## Test

```
npm test
```
