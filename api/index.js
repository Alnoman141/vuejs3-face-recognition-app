const { join } = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const cors = require('cors')

const corsOptions = {
  origin: 'http://localhost:3000'
}
app.use(cors(corsOptions))

app.use(bodyParser.json({ limit: '50mb' }))
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
  })
)
app.use(cookieParser())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'origin, content-type, Authorization'
  )
  res.header('Content-Type', 'application/json')
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})

// Data route
const dataFolder = join(__dirname, '..', 'data')
app.use('/data', express.static(dataFolder))

// datbase
const db = require('./models')
db.sequelize
  .sync()
  .then(() => {
    console.log('Synced db.')
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message)
  })

// API routes
const apiRoutes = express.Router()
apiRoutes.use('/user', require('./controller/user-controller'))
apiRoutes.use('/face', require('./controller/face-controller'))
app.use('/api', apiRoutes)

module.exports = {
  path: '/',
  handler: app
}
