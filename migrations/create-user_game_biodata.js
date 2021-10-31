'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_game_biodata',{ 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model:'user_game', key:'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_game_biodata');
  }
};
