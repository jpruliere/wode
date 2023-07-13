#!/usr/bin/env node
const { join } = require('path')
const http = require('http')

/* Trap on http.createServer to get the server instance */

let serverInstance

const vanillaCS = http.createServer.bind(http)

http.createServer = function (...args) {
  serverInstance = vanillaCS(...args)

  return serverInstance
}

const theWodder = (app) => {
  const send = app.response.send

  app.response.send = function (payload, ...args) {
    return send.bind(this)(payload.replaceAll('n', 'w').replaceAll('N', 'W'), ...args)
  }

  return app
}

const serverFile = process.argv[2]

;(async () => {
  try {
    await require(join(process.cwd(), serverFile))
    if (!(serverInstance instanceof http.Server)) throw new Error('Server was not created via http.createServer')

    const app = serverInstance.listeners('request')[0]
    serverInstance.off('request', app)
    serverInstance.on('request', theWodder(app))
  } catch (e) {
    console.error(e)
  }
})()
