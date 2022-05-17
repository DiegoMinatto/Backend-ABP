'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     return await queryInterface.createTable('users', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        usuario: {
          type: Sequelize.STRING,
          allowNull: false
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false
        },
        password_hash: {
          type: Sequelize.STRING,
          allowNull: false
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
    
    return await queryInterface.dropTable('users');
     
  }
};
