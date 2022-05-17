const express = require('express')

const UserController = require('./controller/UsuariosController')

const routes = express.Router()


routes.post('/login', UserController.login)


module.exports = routes