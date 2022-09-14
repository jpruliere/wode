#!/usr/bin/env node
const express = require('express')
const { join } = require('path')
const { Server } = require('http')

const gateway = express()

const theWodder = (req, res, next) => {
  const send = res.send.bind(res)

  res.send = async (payload) => {
    send(payload.replaceAll('n', 'w').replaceAll('N', 'W'))
  }

  next()
}

gateway.use(theWodder)

const serverFile = process.argv[2]

;(async () => {
  try {
    const server = await require(join(process.cwd(), serverFile))
    if (!(server instanceof Server)) throw new Error('nope, that wont work')

    const { port } = server.address()
    const app = server.listeners('request')[0]
    server.close()
    gateway.use(app)

    gateway.listen(port, () => console.log(`Server ruwwiwg lul`))
  } catch (e) {
    console.error(e)
  }
})()
