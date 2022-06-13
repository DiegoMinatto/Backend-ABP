'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     return await queryInterface.createTable('salas', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        sala: {
          type: Sequelize.STRING,
          allowNull: false
        },
        observacao: {
          type: Sequelize.STRING,
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
    
    return await queryInterface.dropTable('salas');
     
  }
};
