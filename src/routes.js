const express = require('express')

const UserController = require('./controller/UsuariosController')
const ChaveController = require('./controller/SalasController')
const ReservaController = require('./controller/ReservasController')

const authMiddleware = require('./middlewares/auth')

const routes = express.Router()


routes.post('/login', UserController.login)



routes.post('/usuarios/cadastra',authMiddleware, UserController.cadastra)
routes.put('/usuarios/edita/:id',authMiddleware, UserController.edita)
routes.delete('/usuarios/deleta/:id',authMiddleware, UserController.delete)
routes.get('/usuarios/recupera',authMiddleware, UserController.recupera)

routes.post('/chave/cadastra',authMiddleware, ChaveController.cadastra)
routes.put('/chave/edita/:id',authMiddleware, ChaveController.edita)
routes.delete('/chave/deleta/:id',authMiddleware, ChaveController.delete)
routes.get('/chave/recupera',authMiddleware, ChaveController.recupera)
routes.get('/chave/recuperadisponiveis',authMiddleware, ChaveController.recuperaDisponiveis)

routes.post('/reserva/reservar',authMiddleware, ReservaController.reserva);
routes.post('/reserva/devolver',authMiddleware, ReservaController.devolve);
routes.get('/reserva/recupera',authMiddleware, ReservaController.recupera);





module.exports = routes