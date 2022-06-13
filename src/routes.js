const express = require('express')

const UserController = require('./controller/UsuariosController')
const ChaveController = require('./controller/SalasController')
const ReservaController = require('./controller/ReservasController')

const routes = express.Router()


routes.post('/login', UserController.login)



routes.post('/usuarios/cadastra', UserController.cadastra)
routes.put('/usuarios/edita/:id', UserController.edita)
routes.delete('/usuarios/deleta/:id', UserController.delete)
routes.get('/usuarios/recupera', UserController.recupera)

routes.post('/chave/cadastra', ChaveController.cadastra)
routes.put('/chave/edita/:id', ChaveController.edita)
routes.delete('/chave/deleta/:id', ChaveController.delete)
routes.get('/chave/recupera', ChaveController.recupera)

routes.post('/reserva/reservar', ReservaController.reserva);
routes.post('/reserva/devolver', ReservaController.devolve);
routes.get('/reserva/recupera', ReservaController.recupera);





module.exports = routes