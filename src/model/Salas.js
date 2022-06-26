const { Model, DataTypes } = require('sequelize')

class Salas extends Model {
    static init(connection) {
        super.init({

            sala: DataTypes.STRING,
            observacao: DataTypes.STRING

        }, {
            sequelize: connection
        })
    }

    static associate(models) {
        this.belongsTo(models.Reservas, { foreignKey: 'id', as: 'reservas' })
    }
}

module.exports = Salas