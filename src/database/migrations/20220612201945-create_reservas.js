'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     return await queryInterface.createTable('reservas', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        sala_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'salas', key: 'id' },
          onUpdate:'CASCADE',
          onDelete: 'CASCADE'
        },
        nome_reserva: {
          type: Sequelize.STRING,
          allowNull: false
        },
        data_entrega: {
          type: Sequelize.DATEONLY,
          allowNull: true
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        }
       });
     
  },

  down: async (queryInterface, Sequelize) => {
    
    return await queryInterface.dropTable('reservas');
     
  }
};
