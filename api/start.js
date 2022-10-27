const consola = require('consola')

const config = require('../nuxt.config.js')
const api = require('./').handler
config.dev = !(process.env.NODE_ENV === 'production')

const host = config.env.HOST || 'localhost'
const port = config.env.PORT_API || 3001

// Listen the server
api.listen(port, host)
consola.ready({
  message: `API listening on http://${host}:${port}`,
  badge: true
})
