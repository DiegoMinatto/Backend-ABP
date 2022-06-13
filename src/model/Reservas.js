const { Model, DataTypes } = require('sequelize')

class Reservas extends Model {
    static init(connection) {
        super.init({

  

            sala_id: DataTypes.INTEGER,
            nome_reserva: DataTypes.STRING,
            data_entrega: DataTypes.DATEONLY,

        }, {
            sequelize: connection
        })
    }

    static associate(models) {
        this.hasOne(models.Salas, { foreignKey: "id", sourceKey: "sala_id" });
    }
}

module.exports = Reservas