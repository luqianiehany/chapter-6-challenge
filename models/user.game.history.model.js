const { Model, DataTypes } = require('sequelize')
const sequelize = require('./sequalize')

class UserGameHistory extends Model {}

UserGameHistory.init({
    id:{ 
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    time:{
        type: DataTypes.DATE,
        allowNull: false
    },
    result:{
        type: DataTypes.STRING,
        allowNull: false
    },
	user_id: {
		type: DataTypes.INTEGER,
		references: {
			model:'user_game', key:'id'
		},
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	}
}, {
    sequelize,
    tableName: 'user_game_history',
    timestamps: false,
})

module.exports = UserGameHistory