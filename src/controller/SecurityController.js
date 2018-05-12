const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { user } = require('../model')

const jsonUsernameNotFound = {
  code: 404,
  message: 'username not found'
}

const jsonWrongPassword = {
  code: 400,
  message: 'wrong password'
}

const jsonUsernameAlreadyRegistered = {
  code: 400,
  message: 'username already registered'
}

const jsonServerError = {
  code: 500,
  message: 'internal server error'
}

const LoginAction = (req, res) => {
  user.findOne({ where: { username: req.body.username } }).then((data) => {
    if (data) {
      ComparePassword(req, res, data)
    } else {
      res.json(jsonUsernameNotFound)
    }
  })
}

const ComparePassword = (req, res, data) => {
  bcrypt.compare(req.body.password, data.password, (error, isPasswordMatch) => {
    if (error) {
      res.json(jsonServerError)
    }

    if (isPasswordMatch === false) {
      res.json(jsonWrongPassword)
    }

    if (isPasswordMatch === true) {
      CreateToken(res, data)
    }
  })
}

const CreateToken = (res, data) => {
  const token = jwt.sign({ id: data.id, username: data.username }, 'jwtsecret', {
    algorithm: 'HS256'
  })

  res.json({
    code: 200,
    message: 'login success',
    token: token
  })
}

const RegisterAction = (req, res) => {
  user.findOne({ where: { username: req.body.username } }).then((data) => {
    if (data) {
      res.json(jsonUsernameAlreadyRegistered)
    } else {
      GeneratePassword(req, res)
    }
  })
}

const GeneratePassword = (req, res) => {
  bcrypt.hash(req.body.password, 10, (error, passwordHash) => {
    if (error) {
      res.json(jsonServerError)
    }

    const data = {
      username: req.body.username,
      password: passwordHash
    }

    user.create(data).then((data) => {
      res.json({
        code: 200,
        message: 'registration success'
      })
    })
  })
}

module.exports = { // fungsi yang digunakan untuk route
  LoginAction,
  RegisterAction
  // diatas ada fungsi ComparePassword, CreateToken & GeneratePassword.
  // itu digunakan untuk bisa memisahkan code tidak berfokus 1 fungsi
  // biar gampang dibaca dan di debug sih.
}
