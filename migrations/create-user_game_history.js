'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_game_history', { 
		id:{ 
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
        },
        time:{
			type: Sequelize.DATE,
			allowNull: false
        },
        result:{
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
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_game_history');
  }
};
