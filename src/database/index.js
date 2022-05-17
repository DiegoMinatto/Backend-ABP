const Sequelize = require('sequelize')
const dbConfig = require('../config/database')
const Users = require('../model/Users')
const connection = new Sequelize(dbConfig)

Users.init(connection)

Users.associate(connection.models)

module.exports = connection