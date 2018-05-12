const HelloController = require('../controller/HelloController')
const SecurityController = require('../controller/SecurityController')

module.exports = (app) => {
  app.get('/*', HelloController.GetAction)
  app.post('/login', SecurityController.LoginAction)
  app.post('/register', SecurityController.RegisterAction)
}
