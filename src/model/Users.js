const { Model, DataTypes } = require('sequelize')

class Users extends Model {
    static init(connection) {
        super.init({

          usuario: DataTypes.STRING,
          nome: DataTypes.STRING,
          password_hash: DataTypes.STRING,
          ativo: DataTypes.BOOLEAN,
          
        }, {
            sequelize: connection
        })
    }

    static associate(models) {
   
    }
}

module.exports = Users