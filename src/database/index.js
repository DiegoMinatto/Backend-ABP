const Sequelize = require('sequelize')
const dbConfig = require('../config/database')
const Users = require('../model/Users')
const Salas = require('../model/Salas')
const Reservas = require('../model/Reservas')
const connection = new Sequelize(dbConfig)

Users.init(connection)
Salas.init(connection)
Reservas.init(connection)

Users.associate(connection.models)
Salas.associate(connection.models)
Reservas.associate(connection.models)

module.exports = connection