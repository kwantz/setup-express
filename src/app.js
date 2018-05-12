const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')
const models = require('./model')
const routes = require('./route')
const app = express()

app.use(cors())
app.use(morgan('combine'))
app.use(bodyParser.json())

routes(app)

models.sequelize.sync().then(() => {
  app.listen(config.port)
  console.log('')
  console.log('+=======================================================+')
  console.log('| Status: Server is running on http://localhost:' + config.port + '... |')
  console.log('+=======================================================+')
  console.log('')
})
